import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {  FormBuilder,  FormGroup,  Validators,  ReactiveFormsModule} from '@angular/forms';
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

  // ✅ Angular 22 inject style
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private root = inject(RootServices);

  public angForm!: FormGroup;
  public client = false;
  public csiValidation = true;
  public companycode: any[] = [];
accept: any;

  ngOnInit(): void {

    this.createForm();

    // ✅ SSR SAFE: only run in browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadCompanies();
    }
  }

  // =========================
  // FORM
  // =========================
  createForm() {
    this.angForm = this.fb.group(
      {
        fname: ["", Validators.required],
        lastname: ["", Validators.required],
        csi: [""],
        cname: [""],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
          ],
        ],
        uname: ["", [Validators.required, Validators.minLength(5)]],
        pword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatch }
    );
  }

  // =========================
  // SSR SAFE API CALL
  // =========================
  private loadCompanies() {
    this.http
      .get<any[]>(this.root.apiLink + "/getcompany")
      .subscribe({
        next: (data) => this.companycode = data || [],
        error: () => this.companycode = []
      });
  }

  // =========================
  // PASSWORD VALIDATION
  // =========================
  passwordMatch(group: FormGroup) {
    const pass = group.get('pword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }

  // =========================
  // CLIENT TOGGLE
  // =========================
  changeValidation() {
    this.client = !this.client;

    const csi = this.angForm.get("csi");
    const cname = this.angForm.get("cname");

    if (this.client) {
      csi?.setValidators([Validators.required]);
      cname?.setValidators([Validators.required]);
    } else {
      csi?.clearValidators();
      cname?.clearValidators();
      this.csiValidation = true;
    }

    csi?.updateValueAndValidity();
    cname?.updateValueAndValidity();
  }

  // =========================
  // CSI CHECK
  // =========================
  changeCsi() {
    if (!this.companycode?.length) return;

    const csi = this.angForm.value.csi;

    const found = this.companycode.find((x: any) => x.csino === csi);

    this.csiValidation = !!found;

    if (found) {
      this.angForm.patchValue({
        cname: found.company_name
      });
    }
  }

  // =========================
  // SUBMIT
  // =========================
  onSubmit() {

    if (this.angForm.invalid) return;

    const type = (this.client && this.csiValidation) ? "client" : "reader";

    this.http.post(
      "https://esat.ae/wp-content/themes/ESAT/api/register",
      {
        first_name: this.angForm.value.fname,
        last_name: this.angForm.value.lastname,
        username: this.angForm.value.uname,
        password: this.angForm.value.pword,
        email: this.angForm.value.email,
        phone_no: "",
        company: this.angForm.value.cname,
        companyidn: this.angForm.value.csi,
        type,
        date_joined: new Date(),
        image: "/accountupload/login_2.png",
      }
    ).subscribe({
      next: (res: any) => {

        if (res.status === "failed") {
          Swal.fire("Error", "Something went wrong", "error");
        }

        else if (res.status === "emailalreadyexit") {
          Swal.fire("Exists", "Email already exists", "error");
        }

        else if (res.status === 1) {

          this.sendEmail();

          Swal.fire(
            "Success",
            "Activation link sent to email",
            "success"
          ).then(() => {
            this.router.navigateByUrl("/support");
          });
        }
      },
      error: () => {
        Swal.fire("Error", "Server error", "error");
      }
    });
  }

  // =========================
  // EMAIL API
  // =========================
  private sendEmail() {
    this.http.post(
      "https://esat.ae/wp-content/themes/ESAT/api/emailapi/register-form.php",
      {
        email: this.angForm.value.email,
        first_name: this.angForm.value.fname,
        last_name: this.angForm.value.lastname,
        company: this.angForm.value.cname,
        username: this.angForm.value.uname,
      }
    ).subscribe();
  }
}