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
  // ============================================================
  // FORMS
  // ============================================================

  public angForm!: FormGroup;
  public angFormtwo!: FormGroup;
  public supportForm!: FormGroup;

  // ============================================================
  // LOGIN
  // ============================================================

  public isLoggedIn = false;
  public isLoginLoading = false;
  public isResetLoading = false;
  MasterUser: any = null;
  // ============================================================
  // SUPPORT
  // ============================================================

  public isSupportLoading = false;
  public selectedSupportType = '';
  public selectedSupportFile: File | null = null;

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  public showForgotModal = false;

  // ============================================================
  // BROWSER
  // ============================================================

  public isBrowser = false;

  // ============================================================
  // IMAGE
  // ============================================================

  offset = 100;

  Suportimg = 'assets/images/man_esat_logo_bgfethrt.png';
  Suportimg_low = 'assets/images/man_esat_logo_bgfethrt_low.jpg';

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

  // ============================================================
  // CREATE FORMS
  // ============================================================

  createForm(): void {
    // LOGIN FORM
    this.angForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],

      pword: ['', [Validators.required, Validators.minLength(8)]],

      tuse: [false],
    });

    // FORGOT PASSWORD FORM
    this.angFormtwo = this.fb.group({
      address: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
    });

    // SUPPORT FORM
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

  // ============================================================
  // INITIALIZE
  // ============================================================

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    /*
     * FIRST:
     * Check RootServices.
     *
     * This is important when navigating using Angular router.
     */
    if (this.$rootScope.MasterUser && this.$rootScope.MasterUserId) {
      console.log('USER ALREADY LOGGED IN:', this.$rootScope.MasterUser);

      this.isLoggedIn = true;

      this.change.detectChanges();

      return;
    }

    /*
     * SECOND:
     * Try localStorage.
     *
     * This allows remembered users to remain logged in
     * even after page refresh.
     */
    const savedUser = localStorage.getItem('ESATLogInDetails');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user) {
          const userId = user.id ?? user.user_id ?? user.ID ?? null;

          if (userId) {
            this.$rootScope.MasterUser = user;
            this.$rootScope.MasterUserId = userId;

            this.isLoggedIn = true;

            console.log('LOGIN RESTORED:', user);

            console.log('RESTORED USER ID:', userId);

            this.change.detectChanges();

            return;
          }
        }
      } catch (error) {
        console.error('Unable to restore login:', error);

        localStorage.removeItem('ESATLogInDetails');
      }
    }

    /*
     * No logged-in user.
     *
     * Login form will be displayed.
     */
    this.isLoggedIn = false;
  }

  // ============================================================
  // LOGIN
  // ============================================================

  onSubmit(): void {
    if (this.isLoginLoading) {
      return;
    }

    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();

      return;
    }

    this.isLoginLoading = true;

    const username = String(this.angForm.get('uname')?.value || '').trim();

    const password = String(this.angForm.get('pword')?.value || '');

    const payload = {
      username: username,
      password: password,
    };

    const loginUrl = this.$rootScope.apiLink + '/do_login';

    console.log('LOGIN API:', loginUrl);

    this.http
      .post<any>(loginUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      })
      .subscribe({
        // ======================================================
        // SUCCESS
        // ======================================================

        next: (res) => {
          console.log('LOGIN API RESPONSE:', res);

          let user: any = null;

          /*
           * Your existing API response format.
           */
          if (
            res?.success === true &&
            res?.status === 'success' &&
            Array.isArray(res?.data) &&
            res.data.length > 0
          ) {
            user = res.data[0];
          }

          /*
           * Also support direct array response.
           */
          else if (Array.isArray(res) && res.length > 0) {
            user = res[0];
          }

          // ====================================================
          // LOGIN FAILED
          // ====================================================

          if (!user) {
            this.isLoginLoading = false;

            Swal.fire('Invalid Login', res?.message || 'Invalid username or password.', 'error');

            return;
          }

          // ====================================================
          // GET USER ID
          // ====================================================

          const userId = user.id ?? user.user_id ?? user.ID ?? null;

          if (!userId) {
            this.isLoginLoading = false;

            Swal.fire('Login Error', 'Login successful, but user ID was not returned.', 'error');

            return;
          }

          // ====================================================
          // SAVE USER IN ROOT SERVICE
          // ====================================================

          this.$rootScope.MasterUser = user;

          this.$rootScope.MasterUserId = userId;

          console.log('LOGGED IN USER:', user);

          console.log('MasterUserId:', this.$rootScope.MasterUserId);

          // ====================================================
          // REMEMBER ME
          // ====================================================

          if (this.angForm.get('tuse')?.value === true && this.isBrowser) {
            localStorage.setItem('ESATLogInDetails', JSON.stringify(user));
          }

          // ====================================================
          // IMPORTANT
          // ====================================================
          //
          // Set this BEFORE showing the success message.
          //
          // This makes support_entry appear immediately.
          //

          this.isLoggedIn = true;

          this.isLoginLoading = false;

          this.change.detectChanges();

          // ====================================================
          // SUCCESS MESSAGE
          // ====================================================

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome ${user.first_name || user.username || ''}`,

            timer: 1200,

            showConfirmButton: false,
          }).then(() => {
            this.scrollToSupport();
          });
        },

        // ======================================================
        // LOGIN ERROR
        // ======================================================

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

  // ============================================================
  // SCROLL TO SUPPORT FORM
  // ============================================================

  private scrollToSupport(): void {
    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      document.querySelector('.support_entry')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }

  // ============================================================
  // FORGOT PASSWORD
  // ============================================================

  openForgotModal(): void {
    this.showForgotModal = true;

    this.angFormtwo.reset();
  }

  closeForgotModal(): void {
    this.showForgotModal = false;

    this.angFormtwo.reset();
  }

  onModalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeForgotModal();
    }
  }

  onSubmitreset(): void {
    if (this.isResetLoading) {
      return;
    }

    if (this.angFormtwo.invalid) {
      this.angFormtwo.markAllAsTouched();

      return;
    }

    const email = String(this.angFormtwo.get('address')?.value || '').trim();

    this.isResetLoading = true;

    this.sendResetEmail(email);
  }

  private sendResetEmail(email: string): void {
    const resetUrl = this.$rootScope.apiLink + '/emailapi/resetpass-form.php';

    const formData = new FormData();

    formData.append('email', email);

    this.http.post<any>(resetUrl, formData).subscribe({
      next: (res) => {
        console.log('RESET RESPONSE:', res);

        this.isResetLoading = false;

        if (res?.success === true) {
          this.closeForgotModal();

          Swal.fire(
            'Success',
            res.message || 'Password reset instructions have been sent to your email.',
            'success',
          );
        } else {
          Swal.fire(
            'Unable to Reset',
            res?.message || 'Unable to process password reset.',
            'error',
          );
        }
      },

      error: (err) => {
        console.error('RESET ERROR:', err);

        this.isResetLoading = false;

        Swal.fire('Error', err?.error?.message || 'Unable to send reset request.', 'error');
      },
    });
  }

  // ============================================================
  // SELECT SUPPORT TYPE
  // ============================================================

  selectSupportType(type: string): void {
    this.selectedSupportType = type;

    console.log('Selected Support Type:', type);
  }

  // ============================================================
  // CHANGE SUPPORT TYPE
  // ============================================================

  changeSupportType(): void {
    this.selectedSupportType = '';

    this.selectedSupportFile = null;

    this.supportForm.reset();
  }

  // ============================================================
  // FILE SELECT
  // ============================================================

  onSupportFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedSupportFile = null;

      return;
    }

    const file = input.files[0];

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      this.selectedSupportFile = null;

      Swal.fire('File Too Large', 'Please upload a file smaller than 5 MB.', 'warning');

      input.value = '';

      return;
    }

    const allowedTypes = [
      'image/jpeg',

      'image/png',

      'application/pdf',

      'application/msword',

      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

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

    this.selectedSupportFile = file;

    console.log('Selected file:', file.name);
  }

  // ============================================================
  // SUBMIT SUPPORT REQUEST
  // ============================================================

  submitSupportRequest(): void {
    if (this.isSupportLoading) {
      return;
    }

    // ----------------------------------------------------------
    // Make sure user is logged in
    // ----------------------------------------------------------

    if (!this.$rootScope.MasterUserId) {
      Swal.fire('Login Required', 'Please login before submitting a support request.', 'warning');

      this.isLoggedIn = false;

      return;
    }

    // ----------------------------------------------------------
    // Support type
    // ----------------------------------------------------------

    if (!this.selectedSupportType) {
      Swal.fire(
        'Support Type Required',
        'Please select Software Support or Hardware Support.',
        'warning',
      );

      return;
    }

    // ----------------------------------------------------------
    // Form validation
    // ----------------------------------------------------------

    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();

      Swal.fire('Required Fields', 'Please fill in all required fields.', 'warning');

      return;
    }

    this.isSupportLoading = true;

    const userId = this.$rootScope.MasterUserId;

    // ----------------------------------------------------------
    // FormData
    // ----------------------------------------------------------

    const formData = new FormData();

    formData.append('user_id', String(userId));

    formData.append('support_type', this.selectedSupportType);

    formData.append('name', this.supportForm.get('name')?.value || '');

    formData.append('company_name', this.supportForm.get('company_name')?.value || '');

    formData.append('issue_type', this.supportForm.get('issue_type')?.value || '');

    formData.append('module_name', this.supportForm.get('module_name')?.value || '');

    formData.append('form_name', this.supportForm.get('form_name')?.value || '');

    formData.append('contact', this.supportForm.get('contact')?.value || '');

    formData.append('description', this.supportForm.get('description')?.value || '');

    if (this.selectedSupportFile) {
      formData.append('attachment', this.selectedSupportFile, this.selectedSupportFile.name);
    }

    const supportUrl = this.$rootScope.apiLink + '/support-request.php';

    console.log('SUPPORT REQUEST API:', supportUrl);

    this.http.post<any>(supportUrl, formData).subscribe({
      // ======================================================
      // SUCCESS
      // ======================================================

      next: (res) => {
        console.log('SUPPORT API RESPONSE:', res);

        this.isSupportLoading = false;

        if (res?.success === true) {
          this.supportForm.reset();

          this.selectedSupportFile = null;

          this.selectedSupportType = '';

          this.change.detectChanges();

          Swal.fire({
            icon: 'success',

            title: 'Request Submitted',

            text: res.message || 'Your support request has been submitted successfully.',

            confirmButtonText: 'OK',
          }).then(() => {
            /*
             * IMPORTANT:
             *
             * Use singular route:
             * /support-request
             */

            this.router.navigate(['/support-requests']);
          });
        } else {
          Swal.fire(
            'Submission Failed',
            res?.message || 'Unable to submit your support request.',
            'error',
          );
        }
      },

      // ======================================================
      // ERROR
      // ======================================================

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

  // ============================================================
  // LOGOUT
  // ============================================================

  logout(): void {
    console.log('LOGGING OUT');

    // Clear RootServices
    this.$rootScope.MasterUser = null;

    //this.$rootScope.MasterUserId = null;

    // Clear browser storage
    if (this.isBrowser) {
      localStorage.removeItem('ESATLogInDetails');

      sessionStorage.removeItem('ESATLogInDetails');
    }

    // Reset component
    this.isLoggedIn = false;

    this.selectedSupportType = '';

    this.selectedSupportFile = null;

    this.supportForm.reset();

    this.change.detectChanges();

    // Go to support home
    this.router.navigate(['/support']);
  }
}
