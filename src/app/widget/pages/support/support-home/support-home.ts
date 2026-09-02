import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { RootServices } from '../../../../services/root-services';

@Component({
  selector: 'app-support-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './support-home.html',
  styleUrls: ['./support-home.css'],
})
export class SupportHome implements OnInit {
  // =========================================================
  // FORMS
  // =========================================================

  public angForm!: FormGroup;
  public angFormtwo!: FormGroup;
  public supportForm!: FormGroup;

  // =========================================================
  // LOGIN
  // =========================================================

  public isLoggedIn = false;

  // =========================================================
  // UI STATE
  // =========================================================

  public isLoginLoading = false;
  public isResetLoading = false;
  public isSupportLoading = false;

  public showForgotModal = false;

  // =========================================================
  // SUPPORT
  // =========================================================

  public selectedSupportType = '';

  public selectedSupportFile: File | null = null;

  // =========================================================
  // SSR
  // =========================================================

  public isBrowser = false;

  // =========================================================
  // IMAGES
  // =========================================================

  offset = 100;

  Suportimg = 'assets/images/man_esat_logo_bgfethrt.png';

  Suportimg_low = 'assets/images/man_esat_logo_bgfethrt_low.jpg';

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private http: HttpClient,

    public change: ChangeDetectorRef,

    public $rootScope: RootServices,

    private fb: FormBuilder,

    private router: Router,

    @Inject(PLATFORM_ID)
    private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.createForm();
  }

  // =========================================================
  // CREATE FORMS
  // =========================================================

  createForm(): void {
    // =======================================================
    // LOGIN FORM
    // =======================================================

    this.angForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],

      pword: ['', [Validators.required, Validators.minLength(8)]],

      tuse: [false],
    });

    // =======================================================
    // FORGOT PASSWORD FORM
    // =======================================================

    this.angFormtwo = this.fb.group({
      address: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
    });

    // =======================================================
    // SUPPORT FORM
    // =======================================================

    this.supportForm = this.fb.group({
      name: ['', Validators.required],

      company_name: ['', Validators.required],

      issue_type: ['', Validators.required],

      module_name: [''],

      form_name: [''],

      contact: ['', Validators.required],

      description: ['', Validators.required],
    });
  }

  // =========================================================
  // LOGIN
  // =========================================================

  onSubmit(): void {
    if (this.isLoginLoading) {
      return;
    }

    // =======================================================
    // VALIDATE LOGIN FORM
    // =======================================================

    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();

      return;
    }

    this.isLoginLoading = true;

    // =======================================================
    // LOGIN PAYLOAD
    // =======================================================

    const payload = {
      username: String(this.angForm.get('uname')?.value || '').trim(),

      password: String(this.angForm.get('pword')?.value || ''),
    };

    // =======================================================
    // LOGIN URL
    // =======================================================

    const loginUrl = this.$rootScope.apiLink + '/do_login';

    console.log('=================================');
    console.log('LOGIN URL:', loginUrl);
    console.log('LOGIN PAYLOAD:', payload);
    console.log('=================================');

    // =======================================================
    // LOGIN API
    // =======================================================

    this.http
      .post<any>(loginUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      })
      .subscribe({
        // ===================================================
        // SUCCESS
        // ===================================================

        next: (res) => {
          console.log('LOGIN API RESPONSE:', res);

          // =================================================
          // USER
          // =================================================

          let user: any = null;

          // =================================================
          // NEW API RESPONSE FORMAT
          // =================================================

          if (
            res?.success === true &&
            res?.status === 'success' &&
            Array.isArray(res?.data) &&
            res.data.length > 0
          ) {
            user = res.data[0];
          }

          // =================================================
          // OLD API RESPONSE FORMAT
          // =================================================
          else if (Array.isArray(res) && res.length > 0) {
            user = res[0];
          }

          // =================================================
          // LOGIN FAILED
          // =================================================

          if (!user) {
            this.isLoginLoading = false;

            Swal.fire('Invalid Login', res?.message || 'Invalid username or password.', 'error');

            return;
          }

          // =================================================
          // LOGIN USER
          // =================================================

          console.log('LOGIN USER:', user);

          // =================================================
          // SAVE USER
          // =================================================

          this.$rootScope.MasterUser = user;

          this.$rootScope.MasterUserId = user.id;

          console.log('MasterUserId:', this.$rootScope.MasterUserId);

          // =================================================
          // REMEMBER ME
          // =================================================

          if (this.angForm.get('tuse')?.value === true && this.isBrowser) {
            localStorage.setItem('ESATLogInDetails', JSON.stringify(user));
          }

          // =================================================
          // LOGIN SUCCESS
          // =================================================

          this.isLoginLoading = false;

          Swal.fire({
            icon: 'success',

            title: 'Login Successful',

            text: `Welcome ${user.first_name || user.username}`,

            timer: 1200,

            showConfirmButton: false,
          }).then(() => {
            // =================================================
            // SHOW SUPPORT SECTION
            // =================================================

            this.isLoggedIn = true;

            this.change.detectChanges();

            // =================================================
            // SCROLL TO SUPPORT SECTION
            // =================================================

            if (this.isBrowser) {
              setTimeout(() => {
                document.querySelector('.support_entry')?.scrollIntoView({
                  behavior: 'smooth',

                  block: 'start',
                });
              }, 100);
            }
          });
        },

        // ===================================================
        // LOGIN ERROR
        // ===================================================

        error: (err) => {
          console.error('LOGIN ERROR:', err);

          this.isLoginLoading = false;

          Swal.fire(
            'Login Error',

            err?.error?.message || 'Unable to connect to the login API.',

            'error',
          );
        },
      });
  }

  // =========================================================
  // OPEN FORGOT PASSWORD MODAL
  // =========================================================

  openForgotModal(): void {
    if (this.isResetLoading) {
      return;
    }

    this.showForgotModal = true;

    if (this.isBrowser) {
      document.body.classList.add('modal-open');
    }
  }

  // =========================================================
  // CLOSE FORGOT PASSWORD MODAL
  // =========================================================

  closeForgotModal(): void {
    if (this.isResetLoading) {
      return;
    }

    this.showForgotModal = false;

    if (this.isBrowser) {
      document.body.classList.remove('modal-open');
    }

    this.angFormtwo.reset();
  }

  // =========================================================
  // ESC KEY
  // =========================================================

  onModalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.isResetLoading) {
      this.closeForgotModal();
    }
  }

  // =========================================================
  // PASSWORD RESET
  // =========================================================

  onSubmitreset(): void {
    if (this.isResetLoading) {
      return;
    }

    // =======================================================
    // VALIDATE
    // =======================================================

    if (this.angFormtwo.invalid) {
      this.angFormtwo.markAllAsTouched();

      return;
    }

    this.isResetLoading = true;

    const email = String(this.angFormtwo.get('address')?.value || '').trim();

    // =======================================================
    // CHECK EMAIL
    // =======================================================

    this.http
      .post<any>(this.$rootScope.apiLink + '/validate', {
        id: '',
        property: '',
        value: email,
      })
      .subscribe({
        next: (res) => {
          console.log('Validate response:', res);

          // =================================================
          // EMAIL EXISTS
          // =================================================

          if (res?.isUnique === false) {
            this.sendResetEmail(email);
          }

          // =================================================
          // EMAIL NOT FOUND
          // =================================================
          else {
            this.isResetLoading = false;

            Swal.fire('Invalid!', 'Email address not found.', 'error');
          }
        },

        error: (err) => {
          console.error('Email validation error:', err);

          this.isResetLoading = false;

          Swal.fire('Sorry!', 'Something went wrong. Please try again.', 'error');
        },
      });
  }

  // =========================================================
  // SEND RESET EMAIL
  // =========================================================

  private sendResetEmail(email: string): void {
    this.http
      .post<any>('https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/resetpass-form.php', {
        email: email,
      })
      .subscribe({
        next: (res) => {
          console.log('Reset email response:', res);

          this.isResetLoading = false;

          this.closeForgotModal();

          Swal.fire(
            'Password link sent!',

            'You can now reset your password. A message with instructions has been sent to your registered email.',

            'success',
          );
        },

        error: (err) => {
          console.error('Reset email error:', err);

          this.isResetLoading = false;

          Swal.fire(
            'Sorry!',

            'Unable to send the password reset email. Please try again.',

            'error',
          );
        },
      });
  }

  // =========================================================
  // SUPPORT TYPE
  // =========================================================

  selectSupportType(type: string): void {
    this.selectedSupportType = type;

    console.log('Selected Support Type:', type);
  }

  // =========================================================
  // CHANGE SUPPORT TYPE
  // =========================================================

  changeSupportType(): void {
    this.selectedSupportType = '';

    this.selectedSupportFile = null;

    this.supportForm.reset();
  }

  // =========================================================
  // SUPPORT FILE SELECT
  // =========================================================

  onSupportFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedSupportFile = null;

      return;
    }

    const file = input.files[0];

    // =======================================================
    // MAXIMUM FILE SIZE = 5 MB
    // =======================================================

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      this.selectedSupportFile = null;

      Swal.fire(
        'File Too Large',

        'Please upload a file smaller than 5 MB.',

        'warning',
      );

      input.value = '';

      return;
    }

    // =======================================================
    // ALLOWED FILE TYPES
    // =======================================================

    const allowedTypes = [
      'image/jpeg',

      'image/png',

      'application/pdf',

      'application/msword',

      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    // =======================================================
    // INVALID FILE
    // =======================================================

    if (!allowedTypes.includes(file.type)) {
      this.selectedSupportFile = null;

      Swal.fire(
        'Invalid File',

        'Please upload JPG, JPEG, PNG, PDF, DOC or DOCX files only.',

        'warning',
      );

      input.value = '';

      return;
    }

    // =======================================================
    // SAVE FILE
    // =======================================================

    this.selectedSupportFile = file;

    console.log('Selected file:', file.name);
  }

  // =========================================================
  // SUBMIT SUPPORT REQUEST
  // =========================================================

  submitSupportRequest(): void {
    // =======================================================
    // PREVENT DUPLICATE SUBMISSION
    // =======================================================

    if (this.isSupportLoading) {
      return;
    }

    // =======================================================
    // CHECK SUPPORT TYPE
    // =======================================================

    if (!this.selectedSupportType) {
      Swal.fire(
        'Support Type Required',

        'Please select Software Support or Hardware Support.',

        'warning',
      );

      return;
    }

    // =======================================================
    // VALIDATE FORM
    // =======================================================

    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();

      Swal.fire(
        'Required Fields',

        'Please fill in all required fields.',

        'warning',
      );

      return;
    }

    this.isSupportLoading = true;

    // =======================================================
    // CREATE FORMDATA
    // =======================================================

    const formData = new FormData();

    // =======================================================
    // LOGGED-IN USER
    // =======================================================

    const user = this.$rootScope.MasterUser || {};

    const userId = this.$rootScope.MasterUserId || user.id || '';

    // =======================================================
    // SUPPORT INFORMATION
    // =======================================================

    formData.append('user_id', String(userId));

    formData.append('support_type', this.selectedSupportType);

    formData.append('name', String(this.supportForm.get('name')?.value || '').trim());

    formData.append(
      'company_name',
      String(this.supportForm.get('company_name')?.value || '').trim(),
    );

    formData.append('issue_type', String(this.supportForm.get('issue_type')?.value || '').trim());

    formData.append('module_name', String(this.supportForm.get('module_name')?.value || '').trim());

    formData.append('form_name', String(this.supportForm.get('form_name')?.value || '').trim());

    formData.append('contact', String(this.supportForm.get('contact')?.value || '').trim());

    formData.append('description', String(this.supportForm.get('description')?.value || '').trim());

    // =======================================================
    // ATTACHMENT
    // =======================================================

    if (this.selectedSupportFile) {
      formData.append(
        'attachment',

        this.selectedSupportFile,

        this.selectedSupportFile.name,
      );
    }

    // =======================================================
    // API URL
    // =======================================================

    const supportUrl = this.$rootScope.apiLink + '/emailapi/support-request.php';

    // =======================================================
    // DEBUG
    // =======================================================

    console.log('=================================');

    console.log('SUPPORT API:', supportUrl);

    console.log('USER ID:', userId);

    console.log('SUPPORT TYPE:', this.selectedSupportType);

    console.log('SUPPORT FORM:', this.supportForm.value);

    console.log('ATTACHMENT:', this.selectedSupportFile);

    console.log('=================================');

    // =======================================================
    // SEND SUPPORT REQUEST
    // =======================================================

    this.http.post<any>(supportUrl, formData).subscribe({
      // ===================================================
      // API RESPONSE
      // ===================================================

      next: (res) => {
        console.log('SUPPORT API RESPONSE:', res);

        this.isSupportLoading = false;

        // =================================================
        // SUCCESS
        // =================================================

        if (res?.success === true) {
          Swal.fire({
            icon: 'success',

            title: 'Request Submitted',

            text: res.message || 'Your support request has been submitted successfully.',

            confirmButtonText: 'OK',
          });

          // ===============================================
          // RESET FORM
          // ===============================================

          this.supportForm.reset();

          // ===============================================
          // RESET FILE
          // ===============================================

          this.selectedSupportFile = null;

          // ===============================================
          // RESET SUPPORT TYPE
          // ===============================================

          this.selectedSupportType = '';

          this.change.detectChanges();
        }

        // =================================================
        // API RETURNED FAILURE
        // =================================================
        else {
          Swal.fire(
            'Submission Failed',

            res?.message || 'Unable to submit your support request.',

            'error',
          );
        }
      },

      // ===================================================
      // API ERROR
      // ===================================================

      error: (err) => {
        console.error('SUPPORT API ERROR:', err);

        this.isSupportLoading = false;

        Swal.fire(
          'Submission Failed',

          err?.error?.message || 'Unable to submit your support request. Please try again.',

          'error',
        );
      },
    });
  }

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    // SSR-safe initialization
  }
}
