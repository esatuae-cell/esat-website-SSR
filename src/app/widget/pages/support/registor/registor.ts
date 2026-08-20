import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser, CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { RootServices } from '../../../../services/root-services';

@Component({
  selector: 'app-registor',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterModule],

  templateUrl: './registor.html',
  styleUrl: './registor.css',
})
export class Registor implements OnInit {
  // ============================================================
  // DEPENDENCIES
  // ============================================================

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private root = inject(RootServices);

  // ============================================================
  // VARIABLES
  // ============================================================

  public angForm!: FormGroup;

  // Register as client
  public client = false;

  // CSI validation
  // TRUE because normal registration doesn't require CSI
  public csiValidation = true;

  // Terms & conditions
  public accept = false;

  // Company list
  public companycode: any[] = [];

  // ============================================================
  // INIT
  // ============================================================

  ngOnInit(): void {
    this.createForm();

    // SSR SAFE
    if (isPlatformBrowser(this.platformId)) {
      this.loadCompanies();
    }
  }

  // ============================================================
  // CREATE FORM
  // ============================================================

  createForm(): void {
    this.angForm = this.fb.group(
      {
        // First name
        fname: ['', Validators.required],

        // Last name
        lastname: ['', Validators.required],

        // CSI
        csi: [''],

        // Company name
        cname: [''],

        // Email
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          ],
        ],

        // Username
        uname: ['', [Validators.required, Validators.minLength(5)]],

        // Password
        pword: ['', [Validators.required, Validators.minLength(8)]],

        // Confirm password
        confirmPassword: ['', Validators.required],
      },

      {
        validators: this.passwordMatch,
      },
    );
  }

  // ============================================================
  // LOAD COMPANIES
  // ============================================================

  private loadCompanies(): void {
    this.http.get<any[]>(this.root.apiLink + '/getcompany').subscribe({
      next: (data: any[]) => {
        console.log('COMPANY API RESPONSE:', data);

        this.companycode = data || [];
      },

      error: (err) => {
        console.error('COMPANY API ERROR:', err);

        this.companycode = [];
      },
    });
  }

  // ============================================================
  // PASSWORD MATCH
  // ============================================================

  passwordMatch(group: FormGroup) {
    const pass = group.get('pword')?.value;

    const confirm = group.get('confirmPassword')?.value;

    if (!pass || !confirm) {
      return null;
    }

    return pass === confirm ? null : { notSame: true };
  }

  // ============================================================
  // CLIENT CHECKBOX
  // ============================================================

  changeValidation(): void {
    this.client = !this.client;

    const csi = this.angForm.get('csi');

    const cname = this.angForm.get('cname');

    // ========================================================
    // CLIENT ENABLED
    // ========================================================

    if (this.client) {
      // CSI is now required
      csi?.setValidators([Validators.required]);

      // Company is now required
      cname?.setValidators([Validators.required]);

      // IMPORTANT
      // Client requires CSI verification
      this.csiValidation = false;
    }

    // ========================================================
    // CLIENT DISABLED
    // ========================================================
    else {
      // CSI no longer required
      csi?.clearValidators();

      // Company no longer required
      cname?.clearValidators();

      // CSI is automatically valid
      this.csiValidation = true;

      // Clear CSI
      csi?.reset();

      // Clear company
      cname?.reset();
    }

    // Update validation
    csi?.updateValueAndValidity();
    cname?.updateValueAndValidity();
  }

  // ============================================================
  // CSI VALIDATION
  // ============================================================

  changeCsi(): void {
    const csiValue = this.angForm.get('csi')?.value?.toString().trim();

    // Empty CSI
    if (!csiValue) {
      this.csiValidation = false;

      this.angForm.patchValue({
        cname: '',
      });

      return;
    }

    // Find company
    const found = this.companycode?.find(
      (x: any) => String(x.csino).trim() === String(csiValue).trim(),
    );

    // CSI matched
    if (found) {
      this.csiValidation = true;

      this.angForm.patchValue({
        cname: found.company_name,
      });
    }

    // CSI not matched
    else {
      this.csiValidation = false;

      this.angForm.patchValue({
        cname: '',
      });
    }
  }

  // ============================================================
  // ACCEPT TERMS
  // ============================================================

  toggleAccept(): void {
    this.accept = !this.accept;
  }

  // ============================================================
  // SUBMIT BUTTON VALIDATION
  // ============================================================

  isSubmitDisabled(): boolean {
    // Form not created
    if (!this.angForm) {
      return true;
    }

    // Form invalid
    if (this.angForm.invalid) {
      return true;
    }

    // Terms not accepted
    if (!this.accept) {
      return true;
    }

    // Client selected but CSI invalid
    if (this.client && !this.csiValidation) {
      return true;
    }

    // Everything valid
    return false;
  }

  // ============================================================
  // SUBMIT
  // ============================================================

  onSubmit(): void {
    // Security validation
    if (
      !this.angForm ||
      this.angForm.invalid ||
      !this.accept ||
      (this.client && !this.csiValidation)
    ) {
      this.angForm.markAllAsTouched();

      return;
    }

    // Determine registration type
    const type = this.client ? 'client' : 'reader';

    // ========================================================
    // REQUEST DATA
    // ========================================================

    const requestData = {
      first_name: this.angForm.value.fname,

      last_name: this.angForm.value.lastname,

      username: this.angForm.value.uname,

      password: this.angForm.value.pword,

      email: this.angForm.value.email,

      phone_no: '',

      company: this.angForm.value.cname,

      companyidn: this.angForm.value.csi,

      type,

      date_joined: new Date(),

      image: '/accountupload/login_2.png',
    };

    console.log('REGISTER REQUEST:', requestData);

    // ========================================================
    // REGISTER API
    // ========================================================

    this.http
      .post('https://api.esat.ae/wp-content/themes/ESAT/api/register', requestData)

      .subscribe({
        // ====================================================
        // SUCCESS
        // ====================================================

        next: (res: any) => {
          console.log('REGISTER RESPONSE:', res);

          // Username exists
          if (res?.status === 'usernamealreadyexit') {
            Swal.fire('Username Exists', 'This username is already registered.', 'error');

            return;
          }

          // Email exists
          if (res?.status === 'emailalreadyexit') {
            Swal.fire('Email Exists', 'This email address is already registered.', 'error');

            return;
          }

          // Registration successful
          if (res?.status === 1 || res?.status === '1') {
            // Send activation email
            this.sendEmail();

            Swal.fire('Success', 'Activation link sent to email', 'success')

              .then(() => {
                this.router.navigateByUrl('/support');
              });

            return;
          }

          // Other response
          Swal.fire('Error', res?.message || 'Registration failed', 'error');
        },

        // ====================================================
        // ERROR
        // ====================================================

        error: (err) => {
          console.error('REGISTER ERROR:', err);

          console.error('HTTP STATUS:', err.status);

          console.error('ERROR BODY:', err.error);

          Swal.fire(
            'Registration Error',

            err?.error?.message || err?.error?.error || `HTTP Error ${err.status}`,

            'error',
          );
        },
      });
  }

  // ============================================================
  // SEND REGISTRATION EMAIL
  // ============================================================

  private sendEmail(): void {
    const emailData = {
      email: this.angForm.value.email,

      first_name: this.angForm.value.fname,

      last_name: this.angForm.value.lastname,

      company: this.angForm.value.cname,

      username: this.angForm.value.uname,
    };

    console.log('EMAIL REQUEST:', emailData);

    this.http
      .post(
        'https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/register-form.php',

        emailData,
      )

      .subscribe({
        next: (res) => {
          console.log('EMAIL API RESPONSE:', res);
        },

        error: (err) => {
          console.error('EMAIL API ERROR:', err);
        },
      });
  }
}
