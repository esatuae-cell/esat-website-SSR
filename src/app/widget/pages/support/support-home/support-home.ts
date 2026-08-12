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
    // Prevent duplicate requests
    if (this.isLoginLoading) {
      return;
    }

    // Validate form
    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();
      return;
    }

    this.isLoginLoading = true;

    const username = this.angForm.get('uname')?.value;

    const password = this.angForm.get('pword')?.value;

    const payload = {
      username: username,
      password: password,
    };

    this.http
      .post<any>(this.$rootScope.apiLink + '/do_login', payload)

      .subscribe({
        // ===================================================
        // SUCCESS
        // ===================================================

        next: (res) => {
          console.log('Login response:', res);

          // -----------------------------------------------
          // LOGIN FAILED
          // -----------------------------------------------

          if (res?.status === 'failed' || !res || !res[0]) {
            this.isLoginLoading = false;

            Swal.fire('Invalid!', 'The username or password you entered is incorrect.', 'error');

            return;
          }

          // -----------------------------------------------
          // LOGIN SUCCESS
          // -----------------------------------------------

          const user = res[0];

          this.$rootScope.MasterUser = user;

          this.$rootScope.MasterUserId = user.id;

          console.log('Master User:', this.$rootScope.MasterUser);

          console.log('Master User ID:', this.$rootScope.MasterUserId);

          // -----------------------------------------------
          // REMEMBER ME
          // -----------------------------------------------

          const rememberMe = this.angForm.get('tuse')?.value === true;

          if (rememberMe && this.isBrowser) {
            localStorage.setItem('ESATLogInDetails', JSON.stringify(user));
          }

          // -----------------------------------------------
          // LOAD CART
          // -----------------------------------------------

          this.loadUserCart();

          // -----------------------------------------------
          // REDIRECT
          // -----------------------------------------------

          if (this.$rootScope.returnValue && this.$rootScope.returnValue !== '') {
            this.router.navigateByUrl('/support/' + this.$rootScope.returnValue);
          } else {
            this.router.navigateByUrl('/support');
          }

          this.isLoginLoading = false;
        },

        // ===================================================
        // ERROR
        // ===================================================

        error: (err) => {
          console.error('Login error:', err);

          this.isLoginLoading = false;

          Swal.fire('Sorry!', 'Something went wrong. Please try again.', 'error');
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

          if (!res || !res[0] || !res[0].productdetail) {
            return;
          }

          try {
            const products = JSON.parse(res[0].productdetail);

            if (Array.isArray(products)) {
              this.$rootScope.Cart = this.$rootScope.Cart || [];

              /*
               * Clear existing cart first.
               * This prevents duplicate items
               * when loading the cart again.
               */

              this.$rootScope.Cart = [];

              products.forEach((element: any) => {
                this.$rootScope.Cart.push(element);
              });

              this.change.detectChanges();

              // -----------------------------------------
              // LOCAL STORAGE
              // -----------------------------------------

              if (this.isBrowser) {
                localStorage.setItem('ESATCartItems', JSON.stringify(this.$rootScope.Cart));
              }

              // -----------------------------------------
              // SYNC CART
              // -----------------------------------------

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
    this.http
      .post<any>(this.$rootScope.apiLink + '/addtocart', {
        userid: this.$rootScope.MasterUserId,

        dsec: JSON.stringify(this.$rootScope.Cart),

        date: new Date(),
      })
      .subscribe({
        next: (res) => {
          console.log('Cart added to database', res);
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

    /*
     * Prevent page scrolling while modal is open.
     */

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

    // Reset form when modal closes

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

    const email = this.angFormtwo.get('address')?.value;

    // =====================================================
    // CHECK EMAIL
    // =====================================================

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
          } else {
            this.isResetLoading = false;

            Swal.fire('Invalid!', 'Email address not found.', 'error');
          }
        },

        // ===================================================
        // VALIDATION ERROR
        // ===================================================

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
      .post<any>('https://esat.ae/wp-content/themes/ESAT/api/emailapi/resetpass-form.php', {
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
