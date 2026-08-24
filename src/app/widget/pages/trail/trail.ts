import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trail.html',
  styleUrls: ['./trail.css'],
})
export class TrailComponent {
  // ============================================================
  // SERVICES
  // ============================================================

  private http = inject(HttpClient);

  private platformId = inject(PLATFORM_ID);

  private fb = inject(FormBuilder);

  // ============================================================
  // STATE
  // ============================================================

  step = signal<number>(1);

  loading = signal<boolean>(false);

  selectedModules = signal<any[]>([]);

  // ============================================================
  // MODULE LIST
  // ============================================================

  modules = [
    {
      name: 'Fixed Asset',
      icon: 'icon-moduleiconassets_icon',
    },

    {
      name: 'CRM',
      icon: 'icon-moduleiconcrm_icon',
    },

    {
      name: 'Facility & Service',
      icon: 'icon-moduleiconfacilitymanagement_icon',
    },

    {
      name: 'Finance & Accounts',
      icon: 'icon-moduleiconfinancemanagement',
    },

    {
      name: 'Human Resource',
      icon: 'icon-moduleiconhrm_icon',
    },

    {
      name: 'Human Capital',
      icon: 'icon-moduleiconhcm_icon',
    },

    {
      name: 'Payroll',
      icon: 'icon-moduleicon_payrollicon',
    },

    {
      name: 'Sub-Contract',
      icon: 'icon-moduleiconcont_icon',
    },

    {
      name: 'Inventory',
      icon: 'icon-moduleiconlogistic_icon',
    },

    {
      name: 'Procurement',
      icon: 'icon-moduleiconprocurement_icon',
    },

    {
      name: 'Sales',
      icon: 'icon-font-20',
    },

    {
      name: 'Budget and Project',
      icon: 'icon-icon-project',
    },

    {
      name: 'Property',
      icon: 'icon-moduleiconrealestate_icon',
    },

    {
      name: 'Manufacturing',
      icon: 'icon-moduleicontask_icon',
    },

    {
      name: 'Organization',
      icon: 'icon-odesatodmodicon',
    },

    {
      name: 'POS',
      image: 'assets/images/retail-nav.svg',
    },

    {
      name: 'Warehouse',
      image: 'assets/images/warehouse-nav.svg',
    },

    {
      name: 'Fleet & Transportation',
      image: 'assets/images/fleet-nav.svg',
    },

    {
      name: 'CMMS',
      image: 'assets/images/cmms-nav.svg',
    },

    {
      name: 'Shipping/Logistics',
      image: 'assets/images/shipment-nav.svg',
    },

    {
      name: 'Quality Management',
      icon: '',
      image: 'assets/images/quality-nav.svg',
    },
  ];

  // ============================================================
  // FORM
  // ============================================================

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],

    companyName: [''],

    email: ['', [Validators.required, Validators.email]],

    phone: ['', [Validators.required]],

    country: ['', [Validators.required]],

    language: [''],

    companySize: [''],
  });

  // ============================================================
  // MODULE HANDLING
  // ============================================================

  toggleModule(module: any): void {
    const current = this.selectedModules();

    const exists = current.find((m) => m.name === module.name);

    if (exists) {
      this.selectedModules.set(current.filter((m) => m.name !== module.name));
    } else {
      this.selectedModules.set([...current, module]);
    }
  }

  // ============================================================

  isSelected(module: any): boolean {
    return this.selectedModules().some((m) => m.name === module.name);
  }

  // ============================================================

  removeModule(module: any): void {
    this.selectedModules.set(this.selectedModules().filter((m) => m.name !== module.name));
  }

  // ============================================================
  // STEP NAVIGATION
  // ============================================================

  goToForm(): void {
    if (this.selectedModules().length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Modules',
        text: 'Please select at least one module.',
        confirmButtonText: 'OK',
      });

      return;
    }

    this.step.set(2);
  }

  // ============================================================

  goBack(): void {
    this.step.set(1);
  }

  // ============================================================

  goToReview(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.step.set(3);
  }

  // ============================================================

  editForm(): void {
    this.step.set(2);
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  submit(): void {
    // ----------------------------------------------------------
    // SSR PROTECTION
    // ----------------------------------------------------------

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // ----------------------------------------------------------
    // FORM VALIDATION
    // ----------------------------------------------------------

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.step.set(2);

      return;
    }

    // ----------------------------------------------------------
    // MODULE VALIDATION
    // ----------------------------------------------------------

    if (this.selectedModules().length === 0) {
      this.step.set(1);

      Swal.fire({
        icon: 'warning',
        title: 'Select Modules',
        text: 'Please select at least one module.',
        confirmButtonText: 'OK',
      });

      return;
    }

    // ----------------------------------------------------------
    // START LOADING
    // ----------------------------------------------------------

    this.loading.set(true);

    // ==========================================================
    // CREATE ERP LEAD
    // ==========================================================

    this.saveLeadtoERP();

    // ==========================================================
    // SELECTED MODULES
    // ==========================================================

    const selectedModules = this.selectedModules()
      .map((module) => module.name)
      .join(', ');

    // ==========================================================
    // CONTACT FORM PAYLOAD
    // SAME STRUCTURE AS WORKING PARTNERSHIP FORM
    // ==========================================================

    const payload = {
      name: this.form.value.fullName || '',

      email: this.form.value.email || '',

      typeofb: this.form.value.companySize || '',

      compname: this.form.value.companyName || '',

      location: this.form.value.country || '',

      web: '',

      phone: this.form.value.phone || '',

      queries: `
Free Trial Request

Selected Modules:
${selectedModules}

Language:
${this.form.value.language || ''}

Company Size:
${this.form.value.companySize || ''}
      `.trim(),

      // Same subject ID format
      // used by your existing contact form.
      type: 3,
    };

    console.log('=================================');

    console.log('CONTACT FORM PAYLOAD:', payload);

    console.log('=================================');

    // ==========================================================
    // CONTACT FORM API
    // ==========================================================

    this.http
      .post('https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/contact-form.php', payload, {
        responseType: 'text',
      })
      .subscribe({
        next: (response: string) => {
          console.log('CONTACT FORM RAW RESPONSE:', response);

          this.loading.set(false);

          // PHP is returning text, not JSON.
          // So don't check response.success or response.id.

          Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            html: `
        <p>
          Your free trial request has been
          submitted successfully.
        </p>

        <p>
          You will shortly receive your login
          credentials at your registered email.
        </p>
      `,
            confirmButtonText: 'OK',
            confirmButtonColor: '#0d6efd',
          }).then(() => {
            this.form.reset();

            this.selectedModules.set([]);

            this.step.set(1);
          });
        },

        error: (error) => {
          console.error('CONTACT FORM API ERROR:', error);

          console.error('HTTP STATUS:', error.status);

          console.error('ERROR BODY:', error.error);

          this.loading.set(false);

          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: error?.error || error?.message || `HTTP Error ${error.status || 'Unknown'}`,
            confirmButtonText: 'OK',
          });
        },
      });
  }

  // ============================================================
  // SAVE LEAD TO ESAT ERP
  // SAME STRUCTURE AS WORKING PARTNERSHIP FORM
  // ============================================================

  saveLeadtoERP(): void {
    const url = 'https://api.esatcloud.com/api/executeCommonDBProcedureHandlerany/data';

    // ============================================================
    // SELECTED MODULES
    // ============================================================

    const selectedModules = this.selectedModules()
      .map((module) => module.name)
      .join(', ');

    // ============================================================
    // REMARKS / MESSAGE
    // ============================================================

    const remarks =
      'Free Trial Request | ' +
      'Selected Modules: ' +
      selectedModules +
      ' | Language: ' +
      (this.form.value.language || '') +
      ' | Company Size: ' +
      (this.form.value.companySize || '');

    // ============================================================
    // ERP PARAMS
    // ============================================================

    const params = {
      ProcedureName: 'PROC_CRM_INSERTLEADFROMWEBSITE',

      CompanyCode: 'ES',

      ParameterName: [
        'VAR_CLIENTNAME',

        'VAR_LOCATION',

        'VAR_CONTACTPERSON',

        'VAR_EMAIL',

        'VAR_SUBJECT',

        'VAR_TYPEOFBUSINESS',

        'VAR_WEBSITE',

        'VAR_PHONE',

        'VAR_REMARKS',
      ],

      parameterValue: [
        // VAR_CLIENTNAME
        this.form.value.companyName || '',

        // VAR_LOCATION
        this.form.value.country || '',

        // VAR_CONTACTPERSON
        this.form.value.fullName || '',

        // VAR_EMAIL
        this.form.value.email || '',

        // VAR_SUBJECT
        3,

        // VAR_TYPEOFBUSINESS
        this.form.value.companySize || '',

        // VAR_WEBSITE
        '',

        // VAR_PHONE
        this.form.value.phone || '',

        // VAR_REMARKS
        remarks,
      ],
    };

    // ============================================================
    // DEBUG
    // ============================================================

    console.log('================ ERP LEAD ================');

    console.log('SELECTED MODULES:', selectedModules);

    console.log('REMARKS:', remarks);

    console.log('PARAMETER NAME:', params.ParameterName);

    console.log('PARAMETER VALUE:', params.parameterValue);

    console.log('FULL PARAMS:', params);

    console.log('==========================================');

    // ============================================================
    // ERP API
    // ============================================================

    this.http
      .post(url, params, {
        responseType: 'text',
      })
      .subscribe({
        next: (response: string) => {
          console.log('ERP API RESPONSE:', response);

          console.log('✅ ERP LEAD REQUEST COMPLETED');
        },

        error: (error) => {
          console.error('❌ ERP LEAD API ERROR:', error);

          console.error('STATUS:', error.status);

          console.error('BODY:', error.error);
        },
      });
  }
}
