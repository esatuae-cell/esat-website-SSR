import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { HomeCarousel } from '../../shared-component/home-carousel/home-carousel';
import { YutHone } from '../../shared-component/yut-hone/yut-hone';
import { SoftwareSliderHome } from '../../shared-component/software-slider-home/software-slider-home';
import { InfrastructureSliderHome } from '../../shared-component/infrastructure-slider-home/infrastructure-slider-home';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    HomeCarousel,
    YutHone,
    SoftwareSliderHome,
    InfrastructureSliderHome,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class HomeComponent {
  leadForm: FormGroup;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.leadForm = this.fb.group({
      full_name: ['', Validators.required],

      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{7,20}$/)]],

      email: ['', [Validators.required, Validators.email]],

      com_name: ['', Validators.required],

      comments: [''],

      software_modules: [''],
      business_type: [''],
      message: [''],
    });
  }

  apicall(): void {
    console.log('APICALL STARTED');

    if (this.isSubmitting) {
      return;
    }

    if (this.leadForm.invalid) {
      console.log('FORM INVALID');

      this.leadForm.markAllAsTouched();

      return;
    }

    this.isSubmitting = true;

    const val = this.leadForm.getRawValue();

    console.log('FORM DATA:', val);

    const resourceObj = {
      ProcedureName: 'PROC_CRM_INSERTLEADFROMWEBSITE',
      CompanyCode: 'ES',
      ParameterName: [],
      parameterValue: [val.full_name, val.email, val.phone, val.com_name, val.comments],
    };

    console.log('API REQUEST:', resourceObj);

    this.http
      .post('https://report.esatcloud.com/api/executeCommonDBProcedureHandlerany/data', resourceObj)
      .subscribe({
        next: (response) => {
          console.log('API SUCCESS:', response);

          this.isSubmitting = false;

          Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: 'Your demo request has been submitted successfully.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0d6efd',
            allowOutsideClick: false,
          }).then(() => {
            console.log('Redirecting to thank you page...');

            this.leadForm.reset();

            window.location.href = 'https://erp.esat.ae/thankyou.html';
          });
        },

        error: (error: unknown) => {
          console.error('API ERROR:', error);

          this.isSubmitting = false;

          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'Something went wrong. Please try again later.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545',
          });
        },
      });
  }
}
