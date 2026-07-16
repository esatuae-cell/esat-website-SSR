import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RootServices } from '../../../../services/root-services';


@Component({
  selector: 'app-contact-main',
 standalone: true,
  imports: [CommonModule,  ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './contact-main.html',
  styleUrls: ['./contact-main.css'],
})
export class ContactMain implements OnInit, OnDestroy {

  lat = 24.360952;
  lng = 54.521668;

  activelist = 0;
  subjectVal = "General Inquiry";

  angForm!: FormGroup;

  subjectOptions = [
    { id: 0, name: "General Inquiry" },
    { id: 1, name: "Software Inquiry" },
    { id: 2, name: "Hardware Inquiry" },
    { id: 3, name: "Request For Demo" },
    { id: 4, name: "Download Brochure" },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.titleService.setTitle(
      "Contact ESAT ERP Middle East | UAE | ESAT"
    );

    this.meta.updateTag({
      name: "description",
      content:
        "Get in touch today. Let's see what ESAT can do for you."
    });

    this.createForm();

    this.setDefaultSubject();
  }

  // ✅ SSR SAFE DOM handling
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById("buynow");
      el?.style.setProperty("display", "none");
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById("buynow");
      el?.style.setProperty("display", "block");
    }
  }

  // ---------------- FORM ----------------
  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email
        ]
      ],
      typeofbus: ["", Validators.required],
      subject: ["", Validators.required],
      phone_no: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]{10,12}$")
        ]
      ],
      comp_name: ["", Validators.required],
      location: [""],
      website: [""],
      textarea: ["", [Validators.required, Validators.minLength(50)]],
    });
  }

  // ---------------- SUBJECT LOGIC ----------------
  setDefaultSubject() {
    const val =
      this.rootScope?.selectedLink === "Brochure"
        ? "Download Brochure"
        : "Request For Demo";

    this.angForm.patchValue({ subject: val });
    this.activelist = 3;
  }

  activate(index: number) {
    this.activelist = index;
  }

  // ---------------- VALIDATION ----------------
  validateControls() {
    Object.values(this.angForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });
  }

  // ---------------- SUBMIT ----------------
  onComplete() {

    if (this.angForm.invalid) {
      this.validateControls();
      return;
    }

    this.saveLeadtoERP();

    const payload = {
      name: this.angForm.value.name,
      email: this.angForm.value.email,
      typeofb: this.angForm.value.typeofbus,
      compname: this.angForm.value.comp_name,
      location: this.angForm.value.location,
      web: this.angForm.value.website,
      phone: this.angForm.value.phone_no,
      queries: this.angForm.value.textarea,
      type: this.activelist,
    };

    this.http.post(
      "https://esat.ae/wp-content/themes/ESAT/api/emailapi/contact-form.php",
      payload
    ).subscribe();

    Swal.fire({
      title: "Thank you!",
      text: "We will contact you shortly.",
      icon: "success",
    });

    this.createForm();
  }

  // ---------------- ERP ----------------
  saveLeadtoERP() {

    const url =
      "https://api.esatcloud.com/api/executeCommonDBProcedureHandlerany/data";

    const params = {
      ProcedureName: "PROC_CRM_INSERTLEADFROMWEBSITE",
      CompanyCode: "ES",
      ParameterName: [
        "VAR_CLIENTNAME",
        "VAR_LOCATION",
        "VAR_CONTACTPERSON",
        "VAR_EMAIL",
        "VAR_SUBJECT",
        "VAR_TYPEOFBUSINESS",
        "VAR_WEBSITE",
        "VAR_PHONE",
        "VAR_REMARKS",
      ],
      parameterValue: [
        this.angForm.value.comp_name,
        this.angForm.value.location,
        this.angForm.value.name,
        this.angForm.value.email,
        this.activelist,
        this.angForm.value.typeofbus,
        this.angForm.value.website,
        this.angForm.value.phone_no,
        this.angForm.value.textarea,
      ],
    };

    this.http.post(url, params).subscribe();
  }
}