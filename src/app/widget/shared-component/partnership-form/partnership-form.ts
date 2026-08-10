import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partnership-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partnership-form.html',
  styleUrl: './partnership-form.css',
})
export class PartnershipForm implements OnInit, OnDestroy {
  contactForm: FormGroup;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private isBrowser: boolean;
  rootScope: any;
  activelist: number | undefined;
  angForm: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],

      companyName: ['', [Validators.required, Validators.minLength(2)]],

      email: ['', [Validators.required, Validators.email]],

      phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],

      businessType: ['', Validators.required],

      subject: ['', Validators.required],

      softwareModules: [''],

      comments: [''],

      message: [''],
    });
  }

  ngOnInit(): void {
    /*
     * Browser-only code should be executed only here
     * when isBrowser === true.
     */

    if (this.isBrowser) {
      // Example:
      // this.insertIpOnLoad();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  setDefaultSubject(): void {
    const selectedLink = this.rootScope?.selectedLink;

    const value = selectedLink === 'Brochure' ? 'Download Brochure' : 'Request For Demo';

    this.angForm.patchValue({
      subject: value,
    });

    this.activelist = selectedLink === 'Brochure' ? 4 : 3;
  }

  /**
   * Insert activity information when the page loads.
   * Browser-only because window.location is used.
   */
  private insertIpOnLoad(): void {
    if (!this.isBrowser) {
      return;
    }

    const query = {
      UserId: 'support',
      CompanyId: 'ES',
      action: 'CAMPAIGNLOAD',
      eventtype: 'CAMPAIGNLOAD',
      methodname: 'CAMPAIGNLOAD',
      remarks: window.location.href,
      sessionid: '',
      acttype: '',
      formid: 'CAMPAIGNLOAD',
      auditId: 0,
    };

    const URL = 'https://report.esatcloud.com/api/user/updateactivity';

    this.http.post(URL, query).subscribe({
      next: () => {
        console.log('Activity updated');
      },
      error: (error) => {
        console.error('Error updating activity:', error);
      },
    });
  }

  /**
   * Form submission
   */
  public apicall(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValues = this.contactForm.getRawValue();

    const paramNames = [
      'VAR_CLIENTNAME',
      'VAR_LOCATION',
      'VAR_CONTACTPERSON',
      'VAR_EMAIL',
      'VAR_SUBJECT',
      'VAR_TYPEOFBUSINESS',
      'VAR_WEBSITE',
      'VAR_PHONE',
      'VAR_REMARKS',
      'VAR_COMPANYSIZE',
      'VAR_MODULES',
      'VAR_ACTIVITYCODE',
      'VAR_TSAKNO',
      'VAR_CMPNAME',
      'VAR_COMMENTS',
    ];

    const paramValues = [
      formValues.companyName,
      formValues.fullName,
      formValues.email,
      '3',
      formValues.businessType,
      formValues.phone,
      formValues.message,
      null,
      formValues.softwareModules,
      'ACT/ESAT/0006/05/23',
      'TSK/ACT/WV/0048',
      'CAMPAIGNLOAD',
      formValues.comments,
    ];

    const resourceObj = {
      ProcedureName: 'PROC_CRM_INSERTLEADFROMWEBSITE',

      CompanyCode: 'ES',

      ParameterName: paramNames,

      parameterValue: paramValues,
    };

    const URL = 'https://report.esatcloud.com/api/executeCommonDBProcedureHandlerany/data';

    this.http.post(URL, resourceObj).subscribe({
      next: () => {
        /*
         * SweetAlert uses the browser DOM,
         * so never execute it during SSR.
         */
        if (this.isBrowser) {
          Swal.fire({
            title: 'Thank you!',
            text: 'We have received your request in our Partnership Program, and one of our consultants will be in touch with you shortly.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.contactForm.reset();
          });
        } else {
          this.contactForm.reset();
        }
      },

      error: (error) => {
        console.error('Error submitting form:', error);

        if (this.isBrowser) {
          Swal.fire({
            title: 'Something went wrong',
            text: 'We could not submit your request. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
    });
  }

  /**
   * Prevent spaces in phone number
   */
  public preventSpaces(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  /**
   * Show container temporarily.
   * This code must only execute in the browser.
   */
  public showAndHideContainer(): void {
    if (!this.isBrowser) {
      return;
    }

    const container2 = document.getElementById('container-2');

    if (!container2) {
      return;
    }

    container2.style.display = 'block';

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      container2.style.display = 'none';
      this.timeoutId = null;
    }, 3700);
  }
}
