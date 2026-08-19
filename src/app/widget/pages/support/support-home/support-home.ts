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

  // =========================================================
  // UI STATE
  // =========================================================

  public isLoginLoading = false;
  public isResetLoading = false;

  public showForgotModal = false;

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
    this.angForm = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],

      pword: ['', [Validators.required, Validators.minLength(8)]],

      tuse: [false],
    });

    this.angFormtwo = this.fb.group({
      address: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
    });
  }

  // =========================================================
  // LOGIN
  // =========================================================

  onSubmit(): void {
    if (this.isLoginLoading) {
      return;
    }

    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();
      return;
    }

    this.isLoginLoading = true;

    const payload = {
      username: String(this.angForm.get('uname')?.value || '').trim(),
      password: String(this.angForm.get('pword')?.value || ''),
    };

    const loginUrl = this.$rootScope.apiLink + '/do_login';

    console.log('=================================');
    console.log('LOGIN URL:', loginUrl);
    console.log('LOGIN PAYLOAD:', payload);
    console.log('=================================');

    this.http
      .post<any>(loginUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          console.log('LOGIN API RESPONSE:', res);

          // =====================================================
          // SUPPORT BOTH OLD AND NEW API RESPONSE FORMATS
          // =====================================================

          let user: any = null;

          // New format:
          // {
          //   success: true,
          //   status: "success",
          //   data: [...]
          // }

          if (
            res?.success === true &&
            res?.status === 'success' &&
            Array.isArray(res?.data) &&
            res.data.length > 0
          ) {
            user = res.data[0];
          }

          // Old Slim format:
          // [
          //   {...user data...}
          // ]
          else if (Array.isArray(res) && res.length > 0) {
            user = res[0];
          }

          // =====================================================
          // LOGIN FAILED
          // =====================================================

          if (!user) {
            this.isLoginLoading = false;

            Swal.fire('Invalid Login', res?.message || 'Invalid username or password.', 'error');

            return;
          }

          // =====================================================
          // USER FOUND
          // =====================================================

          console.log('LOGIN USER:', user);

          // =====================================================
          // SAVE USER
          // =====================================================

          this.$rootScope.MasterUser = user;
          this.$rootScope.MasterUserId = user.id;

          console.log('MasterUserId:', this.$rootScope.MasterUserId);

          // =====================================================
          // REMEMBER ME
          // =====================================================

          if (this.angForm.get('tuse')?.value === true && this.isBrowser) {
            localStorage.setItem('ESATLogInDetails', JSON.stringify(user));
          }

          // =====================================================
          // LOGIN SUCCESS
          // =====================================================

          this.isLoginLoading = false;

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome ${user.first_name || user.username}`,
            timer: 1200,
            showConfirmButton: false,
          }).then(() => {
            // =================================================
            // LOAD CART
            // =================================================

            this.loadUserCart();

            // =================================================
            // REDIRECT
            // =================================================

            if (this.$rootScope.returnValue && this.$rootScope.returnValue !== '') {
              this.router.navigateByUrl('/support/' + this.$rootScope.returnValue);
            } else {
              this.router.navigateByUrl('/support');
            }
          });
        },

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
  // LOAD CART
  // =========================================================

  private loadUserCart(): void {
    if (!this.$rootScope.MasterUserId) {
      return;
    }

    this.http
      .post<any>(this.$rootScope.apiLink + '/getfromcart', {
        userid: this.$rootScope.MasterUserId,
      })
      .subscribe({
        next: (res) => {
          console.log('Cart response:', res);

          // =================================================
          // NO CART
          // =================================================

          if (!res || !Array.isArray(res) || res.length === 0 || !res[0]?.productdetail) {
            return;
          }

          try {
            const products = JSON.parse(res[0].productdetail);

            if (Array.isArray(products)) {
              // Clear old cart
              this.$rootScope.Cart = [];

              // Add products
              products.forEach((element: any) => {
                this.$rootScope.Cart.push(element);
              });

              // =================================================
              // LOCAL STORAGE
              // =================================================

              if (this.isBrowser) {
                localStorage.setItem('ESATCartItems', JSON.stringify(this.$rootScope.Cart));
              }

              // =================================================
              // CHANGE DETECTION
              // =================================================

              this.change.detectChanges();

              // =================================================
              // SYNC CART
              // =================================================

              this.updateCart();
            }
          } catch (error) {
            console.error('Cart JSON parsing error:', error);
          }
        },

        error: (err) => {
          console.error('Cart not loaded:', err);
        },
      });
  }

  // =========================================================
  // UPDATE CART
  // =========================================================

  private updateCart(): void {
    if (!this.$rootScope.MasterUserId) {
      return;
    }

    this.http
      .post<any>(this.$rootScope.apiLink + '/addtocart', {
        userid: this.$rootScope.MasterUserId,

        dsec: JSON.stringify(this.$rootScope.Cart || []),

        date: new Date().toISOString(),
      })
      .subscribe({
        next: (res) => {
          console.log('Cart added to database:', res);
        },

        error: (err) => {
          console.error('Cart not added to database:', err);
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

    if (this.angFormtwo.invalid) {
      this.angFormtwo.markAllAsTouched();

      return;
    }

    this.isResetLoading = true;

    const email = this.angFormtwo.get('address')?.value?.trim();

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

          // Email exists
          if (res?.isUnique === false) {
            this.sendResetEmail(email);
          } else {
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
  // INIT
  // =========================================================

  ngOnInit(): void {
    // SSR-safe initialization
  }
}
