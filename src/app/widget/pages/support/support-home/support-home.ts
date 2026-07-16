import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  returnValue: any;

  angForm!: FormGroup;
  angFormtwo!: FormGroup;

  // LOGIN STATE (THIS CONTROLS UI)
  isLoggedIn = false;

  // Images
  offset = 100;
  Suportimg = 'assets/images/man_esat_logo_bgfethrt.png';
  Suportimg_low = 'assets/images/man_esat_logo_bgfethrt_low.jpg';

  constructor(
    private http: HttpClient,
    private change: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    public rootService: RootServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.rootService.MasterUserId;
  }

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
          Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.angForm.invalid) {
      this.angForm.markAllAsTouched();
      return;
    }

    this.http
      .post<any>(`${this.rootService.apiLink}/do_login`, {
        username: this.angForm.value.uname,
        password: this.angForm.value.pword,
      })
      .subscribe({
        next: (res: any) => {
          if (res.status === 'failed') {
            Swal.fire(
              'Invalid!',
              'The username or password you entered is incorrect.',
              'error'
            );
            return;
          }

          // STORE USER
          this.rootService.MasterUser = res[0];
          this.rootService.MasterUserId = res[0].id;

          // UPDATE UI STATE
          this.isLoggedIn = true;

          // SSR SAFE LOCAL STORAGE
          if (isPlatformBrowser(this.platformId) && this.angForm.value.tuse) {
            localStorage.setItem(
              'ESATLogInDetails',
              JSON.stringify(this.rootService.MasterUser)
            );
          }

          if (this.rootService.returnValue) {
            this.router.navigateByUrl(
              '/support/' + this.rootService.returnValue
            );
          }

          this.loadCart();
        },

        error: () => {
          Swal.fire('Sorry!', 'Something went wrong.', 'error');
        },
      });
  }

  private loadCart(): void {
    this.http
      .post<any>(`${this.rootService.apiLink}/getfromcart`, {
        userid: this.rootService.MasterUserId,
      })
      .subscribe({
        next: (res: any) => {
          if (!res || !res[0]) return;

          const products = JSON.parse(res[0].productdetail);

          products.forEach((item: any) => {
            this.rootService.Cart.push(item);
          });

          this.change.detectChanges();

          this.http
            .post(`${this.rootService.apiLink}/addtocart`, {
              userid: this.rootService.MasterUserId,
              dsec: JSON.stringify(this.rootService.Cart),
              date: new Date(),
            })
            .subscribe();

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(
              'ESATCartItems',
              JSON.stringify(this.rootService.Cart)
            );
          }
        },

        error: () => {
          console.error('Unable to load cart.');
        },
      });
  }

  onSubmitreset(): void {
    if (this.angFormtwo.invalid) {
      this.angFormtwo.markAllAsTouched();
      return;
    }

    this.http
      .post<any>(`${this.rootService.apiLink}/validate`, {
        id: '',
        property: '',
        value: this.angFormtwo.value.address,
      })
      .subscribe({
        next: (res: any) => {
          if (res.isUnique === false) {
            this.http
              .post(
                'https://esat.ae/wp-content/themes/ESAT/api/emailapi/resetpass-form.php',
                {
                  email: this.angFormtwo.value.address,
                }
              )
              .subscribe();

            if (isPlatformBrowser(this.platformId)) {
              const modalElement = document.getElementById('myModalfrg');

              if (modalElement && (window as any).bootstrap) {
                const modal =
                  (window as any).bootstrap.Modal.getInstance(modalElement) ||
                  new (window as any).bootstrap.Modal(modalElement);

                modal.hide();
              }
            }

            Swal.fire(
              'Password link sent!',
              'You can now reset your password. Instructions have been sent to your registered email.',
              'success'
            );
          } else {
            Swal.fire('Invalid!', 'Email address not found.', 'error');
          }
        },

        error: () => {
          Swal.fire('Sorry!', 'Something went wrong.', 'error');
        },
      });
  }
}