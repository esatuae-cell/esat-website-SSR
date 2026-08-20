import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [
    CommonModule, // ✅ FIX FOR *ngIf / *ngFor
    ReactiveFormsModule, // forms support
  ],
  templateUrl: './trail.html',
  styleUrls: ['./trail.css'],
})
export class TrailComponent {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);

  // =========================
  // SSR SAFE STATE (signals)
  // =========================
  step = signal<number>(1);
  loading = signal<boolean>(false);

  selectedModules = signal<any[]>([]);

  // =========================
  // MODULE LIST
  // =========================
  modules = [
    { name: 'Fixed Asset', icon: 'icon-moduleiconassets_icon' },
    { name: 'CRM', icon: 'icon-moduleiconcrm_icon' },
    { name: 'Facility & Service', icon: 'icon-moduleiconfacilitymanagement_icon' },
    { name: 'Finance & Accounts', icon: 'icon-moduleiconfinancemanagement' },
    { name: 'Human Resource', icon: 'icon-moduleiconhrm_icon' },
    { name: 'Human Capital', icon: 'icon-moduleiconhcm_icon' },
    { name: 'Payroll', icon: 'icon-moduleicon_payrollicon' },
    { name: 'Sub-Contract', icon: 'icon-moduleiconcont_icon' },
    { name: 'Inventory', icon: 'icon-moduleiconlogistic_icon' },
    { name: 'Procurement', icon: 'icon-moduleiconprocurement_icon' },
    { name: 'Sales', icon: 'icon-font-20' },
    { name: 'Budget and Project', icon: 'icon-icon-project' },
    { name: 'Property', icon: 'icon-moduleiconrealestate_icon' },
    { name: 'Manufacturing', icon: 'icon-moduleicontask_icon' },
    { name: 'Organization', icon: 'icon-odesatodmodicon' },

    { name: 'POS', image: 'assets/images/retail-nav.svg' },
    { name: 'Warehouse', image: 'assets/images/warehouse-nav.svg' },
    { name: 'Fleet & Transportation', image: 'assets/images/fleet-nav.svg' },
    { name: 'CMMS', image: 'assets/images/cmms-nav.svg' },
    { name: 'Shipping/Logistics', image: 'assets/images/shipment-nav.svg' },
    { name: 'Quality Management', image: 'assets/images/quality-nav.svg' },
  ];

  // =========================
  // REACTIVE FORM (SSR SAFE)
  // =========================
  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    companyName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    country: ['', [Validators.required]],
    language: [''],
    companySize: [''],
  });

  // =========================
  // MODULE HANDLING (IMMUTABLE)
  // =========================

  toggleModule(module: any) {
    const current = this.selectedModules();

    const exists = current.find((m) => m.name === module.name);

    if (exists) {
      this.selectedModules.set(current.filter((m) => m.name !== module.name));
    } else {
      this.selectedModules.set([...current, module]);
    }
  }

  isSelected(module: any): boolean {
    return this.selectedModules().some((m) => m.name === module.name);
  }

  removeModule(module: any) {
    this.selectedModules.set(this.selectedModules().filter((m) => m.name !== module.name));
  }

  // =========================
  // STEP NAVIGATION
  // =========================

  goToForm() {
    if (this.selectedModules().length === 0) return;
    this.step.set(2);
  }

  goBack() {
    this.step.set(1);
  }

  goToReview() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.step.set(3);
  }

  editForm() {
    this.step.set(2);
  }

  // =========================
  // SUBMIT (SSR SAFE)
  // =========================

  // submit() {

  //   if (!isPlatformBrowser(this.platformId)) return; // SSR GUARD

  //   this.loading.set(true);

  //   const payload = {
  //     ...this.form.value,
  //     selectedModules: this.selectedModules()
  //   };

  //   this.http.post(
  //     'https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/trail-mail.php',
  //     payload
  //   ).subscribe({
  //     next: () => {
  //       this.loading.set(false);

  //       // SSR-safe UI feedback (no alert in real production)
  //       console.log('Success');

  //       // reset
  //       this.step.set(1);
  //       this.selectedModules.set([]);
  //       this.form.reset();
  //     },

  //     error: (err) => {
  //       this.loading.set(false);
  //       console.error(err);
  //     }
  //   });
  // }

  submit(): void {
    // Don't execute API during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.step.set(2);
      return;
    }

    if (this.selectedModules().length === 0) {
      this.step.set(1);
      return;
    }

    this.loading.set(true);

    const payload = {
      fullName: this.form.value.fullName,
      companyName: this.form.value.companyName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      country: this.form.value.country,
      language: this.form.value.language,
      companySize: this.form.value.companySize,

      selectedModules: this.selectedModules().map((module) => module.name),
    };

    console.log('TRIAL PAYLOAD:', payload);

    this.http
      .post<any>('https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/trail-mail.php', payload)
      .subscribe({
        next: (response) => {
          console.log('TRIAL RESPONSE:', response);

          this.loading.set(false);

          if (response?.success === true) {
            Swal.fire({
              icon: 'success',
              title: 'Thank You!',
              html: `<p>Your free trial request has been submitted successfully.</p>
    <p>You will shortly receive your login credentials in Registed email.</p>  `,
              confirmButtonText: 'OK',
              confirmButtonColor: '#0d6efd',
            }).then(() => {
              // Reset form
              this.form.reset();

              // Remove selected modules
              this.selectedModules.set([]);

              // Go back to Step 1
              this.step.set(1);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Submission Failed',
              text: response?.message || 'Unable to submit your request. Please try again.',
              confirmButtonText: 'OK',
            });
          }
        },

        error: (err) => {
          console.error('TRIAL SUBMISSION ERROR:', err);
          this.loading.set(false);
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: err?.error?.message || 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK',
          });
        },
      });
  }
}
