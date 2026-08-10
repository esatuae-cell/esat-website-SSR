import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { afterNextRender } from '@angular/core';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partnership-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partnership-form.html',
  styleUrl: './partnership-form.css',
})
export class PartnershipForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  readonly contactForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
    businessType: ['', Validators.required],
    softwareModules: [''],
    comments: [''],
    message: [''],
  });

  constructor() {
    /**
     * Runs only in the browser.
     * afterNextRender does not execute during SSR.
     */
    afterNextRender(() => {
      this.getClientIp();
    });

    this.destroyRef.onDestroy(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    });
  }

  get fullName() {
    return this.contactForm.controls.fullName;
  }

  get companyName() {
    return this.contactForm.controls.companyName;
  }

  get email() {
    return this.contactForm.controls.email;
  }

  get phone() {
    return this.contactForm.controls.phone;
  }

  get businessType() {
    return this.contactForm.controls.businessType;
  }

  get comments() {
    return this.contactForm.controls.comments;
  }

  /**
   * Gets the client IP only in the browser.
   */
  private getClientIp(): void {
    this.http
      .get('https://api.ipify.org?format=text', {
        responseType: 'text',
      })
      .subscribe({
        next: (ip) => this.insertIpOnLoad(ip),
        error: (error) => {
          console.error('Failed to get IP address:', error);
        },
      });
  }

  /**
   * Records campaign page load activity.
   */
  private insertIpOnLoad(ip: string): void {
    const query = {
      UserId: 'support',
      CompanyId: 'ES',
      action: 'CAMPAIGNLOAD',
      eventtype: 'CAMPAIGNLOAD',
      methodname: 'CAMPAIGNLOAD',
      remarks: window.location.href,
      sessionid: '',
      refno: ip,
      acttype: '',
      formid: 'CAMPAIGNLOAD',
      auditId: 0,
    };

    this.http.post('https://report.esatcloud.com/api/user/updateactivity', query).subscribe({
      next: () => {
        console.log('Activity updated');
      },
      error: (error) => {
        console.error('Error updating activity:', error);
      },
    });
  }

  /**
   * Submit partnership form.
   */
  submit(): void {
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

    /**
     * IMPORTANT:
     * Your original code has 15 parameter names but only 13 values.
     *
     * Do not change the backend mapping until you confirm what the
     * missing values are supposed to be.
     */
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

    this.http
      .post('https://report.esatcloud.com/api/executeCommonDBProcedureHandlerany/data', resourceObj)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Thank you!',
            text: 'We have received your request in our Partnership Program, and one of our consultants will be in touch with you shortly.',
            icon: 'success',
          });

          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting form:', error);

          Swal.fire({
            title: 'Something went wrong',
            text: 'Unable to submit your request. Please try again.',
            icon: 'error',
          });
        },
      });
  }

  /**
   * Prevent spaces in phone number.
   * HTML inputmode/pattern also provide validation,
   * so this is only an additional UX restriction.
   */
  preventSpaces(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  /**
   * Shows container-2 temporarily.
   *
   * This method is browser-only because it accesses the DOM.
   */
  showAndHideContainer(): void {
    const container = document.getElementById('container-2');

    if (!container) {
      return;
    }

    container.classList.add('show');

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      container.classList.remove('show');
    }, 3700);
  }
}
