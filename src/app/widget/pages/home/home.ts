import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

import { HomeCarousel } from '../../shared-component/home-carousel/home-carousel';
import { YutHone } from '../../shared-component/yut-hone/yut-hone';
import { SoftwareSliderHome } from '../../shared-component/software-slider-home/software-slider-home';
import { InfrastructureSliderHome } from '../../shared-component/infrastructure-slider-home/infrastructure-slider-home';

import { RootServices } from '../../../services/root-services';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,

  templateUrl: './home.html',
  styleUrl: './home.css',

  imports: [
    ReactiveFormsModule,
    RouterLink,
    HomeCarousel,
    CommonModule,
    ReactiveFormsModule,
    YutHone,
    SoftwareSliderHome,
    InfrastructureSliderHome,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  lat = 24.360952;
  lng = 54.521668;

  activelist = 0;
  subjectVal = 'General Inquiry';

  angForm!: FormGroup;

  subjectOptions = [
    { id: 0, name: 'General Inquiry' },
    { id: 1, name: 'Software Inquiry' },
    { id: 2, name: 'Hardware Inquiry' },
    { id: 3, name: 'Request For Demo' },
    { id: 4, name: 'Download Brochure' },
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
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.titleService.setTitle('Contact ESAT ERP Middle East | UAE | ESAT');

    this.meta.updateTag({
      name: 'description',
      content: "Get in touch today. Let's see what ESAT can do for you.",
    });

    this.createForm();
    this.setDefaultSubject();
  }

  // --------------------------------------------------
  // SSR SAFE INITIALIZATION
  // --------------------------------------------------
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('buynow');

      if (element) {
        element.style.display = 'none';
      }
    }
  }

  // --------------------------------------------------
  // SSR SAFE CLEANUP
  // --------------------------------------------------
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('buynow');

      if (element) {
        element.style.display = 'block';
      }
    }
  }

  // --------------------------------------------------
  // FORM
  // --------------------------------------------------
  createForm(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      typeofbus: [''],

      subject: [''],

      phone_no: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],

      comp_name: ['', Validators.required],

      location: [''],

      website: [''],

      textarea: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // --------------------------------------------------
  // SUBJECT
  // --------------------------------------------------
  setDefaultSubject(): void {
    const selectedLink = this.rootScope?.selectedLink;

    const value = selectedLink === 'Brochure' ? 'Download Brochure' : 'Request For Demo';

    this.angForm.patchValue({
      subject: value,
    });

    this.activelist = selectedLink === 'Brochure' ? 4 : 3;
  }

  // Called from the subject select in HTML
  activate(index: number): void {
    this.activelist = index;
  }

  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------
  validateControls(): void {
    Object.values(this.angForm.controls).forEach((control) => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------
  onComplete(): void {
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

    this.http
      .post('https://esat.ae/wp-content/themes/ESAT/api/emailapi/contact-form.php', payload)
      .subscribe({
        next: () => {
          // Email request completed
        },
        error: (error) => {
          console.error('Contact form email API error:', error);
        },
      });

    Swal.fire({
      title: 'Thank you!',
      text: 'We will contact you shortly.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'https://erp.esat.ae/thankyou.html';
      }
    });

    this.createForm();

    // Restore default subject after resetting form
    this.setDefaultSubject();
  }

  // --------------------------------------------------
  // ERP
  // --------------------------------------------------
  saveLeadtoERP(): void {
    const url = 'https://api.esatcloud.com/api/executeCommonDBProcedureHandlerany/data';

    const params = {
      ProcedureName: 'PROC_CRM_INSERTLEADFROMWEBSITE',

      CompanyCode: 'ES',

      ParameterName: [
        'VAR_CLIENTNAME',
        'VAR_LOCATION',
        'VAR_CONTACTPERSON',
        'VAR_EMAIL',
        'VAR_SUBJECT',
        'VAR_TYPEOFBUSINESS',
        'VAR_WEBSITE',
        'VAR_PHONE',
        'VAR_REMARKS',
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

    this.http.post(url, params).subscribe({
      next: () => {
        // ERP request completed
      },
      error: (error) => {
        console.error('ERP lead API error:', error);
      },
    });
  }
}
