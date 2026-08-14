import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { DomSanitizer, Title, Meta } from '@angular/platform-browser';

import { Router, NavigationEnd } from '@angular/router';

import { filter, catchError, of, Subject, finalize, takeUntil } from 'rxjs';

import { RootServices } from '../../../services/root-services';

@Component({
  selector: 'app-careers-load',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './careers-load.html',
  styleUrl: './careers-load.css',
})
export class CareersLoad implements OnInit, OnDestroy {
  // ==================================================
  // Data
  // ==================================================

  jobData: any[] = [];

  jobCategory: any[] = [];

  dataValue: any = null;

  selectedCategoryIndex: number | null = null;

  selectedJob: any = null;

  jobDataLoaded = false;

  jobApiLoading = false;

  // ==================================================
  // UI
  // ==================================================

  swcbody = true;

  showPopup = false;

  showForm = false;

  infoblocks: Record<number, boolean> = {};

  // ==================================================
  // Form
  // ==================================================

  applicationForm: FormGroup;

  selectedFile: File | null = null;

  // ==================================================
  // Browser
  // ==================================================

  isBrowser = false;

  afuConfig: any = null;

  // ==================================================
  // Destroy
  // ==================================================

  private destroy$ = new Subject<void>();

  // ==================================================
  // API URLs
  // ==================================================

  private readonly wordpressApi = 'https://api.esat.ae/wp-json/wp/v2/pages/';

  private readonly careerUploadApi =
    'https://api.esat.ae/wp-content/themes/ESAT/api/emailapi/career-fileupload.php';

  // ==================================================
  // Constructor
  // ==================================================

  constructor(
    private fb: FormBuilder,

    private http: HttpClient,

    private sanitizer: DomSanitizer,

    public root: RootServices,

    private titleService: Title,

    private meta: Meta,

    private ref: ChangeDetectorRef,

    private router: Router,

    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.applicationForm = this.fb.group({
      name: ['', Validators.required],

      address: ['', [Validators.required, Validators.email]],

      phone_no: ['', Validators.required],

      subject: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],

      textarea: [''],

      resume: [null, Validators.required],
    });
  }

  // ==================================================
  // INIT
  // ==================================================

  ngOnInit(): void {
    this.root.contactoption = 0;

    console.log('=================================');
    console.log('CAREERS COMPONENT INITIALIZED');
    console.log('=================================');

    console.log('WordPress API:', this.wordpressApi);

    // ----------------------------------------------
    // Browser only
    // ----------------------------------------------

    if (this.isBrowser) {
      const loader = document.getElementById('loadingshield');

      if (loader) {
        loader.style.display = 'none';
      }

      this.afuConfig = {
        multiple: false,

        formatsAllowed: '.docx,.pdf',

        maxSize: '2',

        uploadAPI: {
          url: `${this.root.apiLink}/resumeFile.php`,
        },

        hideResetBtn: true,

        replaceTexts: {
          uploadBtn: 'Upload your CV',
        },
      };
    }

    // ----------------------------------------------
    // Load careers
    // ----------------------------------------------

    this.loadCareerData();

    // ----------------------------------------------
    // Reload when navigating to careers
    // ----------------------------------------------

    if (this.isBrowser) {
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),

          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          console.log('Navigation detected - reloading careers');

          this.loadCareerData();
        });
    }
  }

  // ==================================================
  // LOAD CAREER DATA
  // ==================================================

  private loadCareerData(): void {
    console.log('=================================');

    console.log('CAREERS API START');

    console.log('CAREERS API URL:', this.wordpressApi + '203');

    console.log('=================================');

    // ----------------------------------------------
    // Reset state
    // ----------------------------------------------

    this.jobDataLoaded = false;

    this.jobApiLoading = true;

    this.jobCategory = [];

    this.jobData = [];

    this.dataValue = null;

    // ----------------------------------------------
    // Career page
    // WordPress page ID = 203
    // ----------------------------------------------

    const apiUrl = this.wordpressApi + '203';

    // ----------------------------------------------
    // HTTP
    // ----------------------------------------------

    this.http
      .get<any>(apiUrl)
      .pipe(
        takeUntil(this.destroy$),

        catchError((error) => {
          console.error('=================================');

          console.error('CAREER API ERROR');

          console.error(error);

          console.error('=================================');

          return of(null);
        }),

        finalize(() => {
          console.log('CAREER API FINISHED');

          this.jobApiLoading = false;

          this.jobDataLoaded = true;

          if (this.isBrowser) {
            this.ref.detectChanges();
          }
        }),
      )
      .subscribe((response) => {
        console.log('CAREER API RESPONSE:', response);

        if (!response) {
          console.error('Career API returned empty response');

          return;
        }

        // ------------------------------------------
        // Check ACF
        // ------------------------------------------

        if (!response.acf) {
          console.error('Career API has no ACF data:', response);

          return;
        }

        // ------------------------------------------
        // Store response
        // ------------------------------------------

        this.dataValue = response;

        // ------------------------------------------
        // Prepare jobs
        // ------------------------------------------

        this.preparejobcategory(response);

        console.log('=================================');

        console.log('JOB CATEGORY:', this.jobCategory);

        console.log(
          'JOB COUNT:',
          this.jobCategory.reduce((total, category) => total + category.joblist.length, 0),
        );

        console.log('=================================');
      });
  }

  // ==================================================
  // PREPARE JOB CATEGORY
  // ==================================================

  preparejobcategory(dataValue: any): void {
    this.jobCategory = [];

    if (!dataValue?.acf) {
      console.warn('No ACF data available');

      return;
    }

    const labelMap: Record<string, string> = {
      software_jobs: 'Software Careers',

      hardware_jobs: 'Hardware Careers',

      sales_marketing: 'Sales & Marketing Careers',

      admin_jobs: 'Administrative Careers',
    };

    // ----------------------------------------------
    // Loop ACF fields
    // ----------------------------------------------

    for (const key of Object.keys(dataValue.acf)) {
      // --------------------------------------------
      // Ignore non-job fields
      // --------------------------------------------

      if (['content', 'main_image', 'inner_image', 'quotes'].includes(key)) {
        continue;
      }

      const value = dataValue.acf[key];

      // --------------------------------------------
      // Only arrays
      // --------------------------------------------

      if (!Array.isArray(value)) {
        continue;
      }

      // --------------------------------------------
      // Remove empty jobs
      // --------------------------------------------

      const jobs = value.filter((job: any) => job !== null && job !== undefined);

      // --------------------------------------------
      // Add category
      // --------------------------------------------

      this.jobCategory.push({
        category: labelMap[key] || 'Other Careers',

        joblist: jobs,

        show: false,

        available: jobs.length > 0,
      });
    }

    console.log('Prepared categories:', this.jobCategory);
  }

  // ==================================================
  // ACCORDION
  // ==================================================

  toggleAccordion(index: number): void {
    this.selectedCategoryIndex = this.selectedCategoryIndex === index ? null : index;
  }

  // ==================================================
  // OPEN JOB
  // ==================================================

  openJobPopup(job: any): void {
    if (!job) {
      return;
    }

    this.selectedJob = job;

    this.showPopup = true;

    this.showForm = false;

    this.applicationForm.patchValue({
      subject: job?.title || '',
    });
  }

  // ==================================================
  // CLOSE POPUP
  // ==================================================

  closePopup(): void {
    this.showPopup = false;

    this.selectedJob = null;

    this.showForm = false;

    this.selectedFile = null;

    this.applicationForm.reset({
      name: '',

      address: '',

      phone_no: '',

      subject: {
        value: '',
        disabled: true,
      },

      textarea: '',

      resume: null,
    });
  }

  // ==================================================
  // SHOW APPLICATION FORM
  // ==================================================

  showApplicationForm(): void {
    if (!this.selectedJob) {
      return;
    }

    this.showForm = true;
  }

  // ==================================================
  // SUBMIT APPLICATION
  // ==================================================

  submitApplication(): void {
    // ----------------------------------------------
    // Validate form
    // ----------------------------------------------

    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();

      return;
    }

    // ----------------------------------------------
    // Check file
    // ----------------------------------------------

    if (!this.selectedFile) {
      this.applicationForm.get('resume')?.setErrors({
        required: true,
      });

      this.applicationForm.markAllAsTouched();

      return;
    }

    // ----------------------------------------------
    // Browser only
    // ----------------------------------------------

    if (!this.isBrowser) {
      return;
    }

    // ----------------------------------------------
    // FormData
    // ----------------------------------------------

    const formData = new FormData();

    formData.append('name', this.applicationForm.get('name')?.value || '');

    formData.append('email', this.applicationForm.get('address')?.value || '');

    formData.append('phone', this.applicationForm.get('phone_no')?.value || '');

    formData.append('subject', this.selectedJob?.title || 'Job Application');

    formData.append('message', this.applicationForm.get('textarea')?.value || '');

    formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log('Submitting career application to:', this.careerUploadApi);

    // ----------------------------------------------
    // Submit
    // ----------------------------------------------

    this.http
      .post(this.careerUploadApi, formData)
      .pipe(
        takeUntil(this.destroy$),

        catchError((error) => {
          console.error('Career application submission error:', error);

          return of(null);
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Career application response:', response);

          if (response) {
            this.closePopup();
          }
        },

        error: (error) => {
          console.error('Unexpected submission error:', error);
        },
      });
  }

  // ==================================================
  // FILE CHANGE
  // ==================================================

  onFileChange(event: Event): void {
    if (!this.isBrowser) {
      return;
    }

    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;

    this.applicationForm.patchValue({
      resume: file,
    });

    this.applicationForm.get('resume')?.updateValueAndValidity();
  }

  // ==================================================
  // TOGGLE INFO BLOCK
  // ==================================================

  toggleBlock(index: number): void {
    if (!this.isBrowser) {
      return;
    }

    this.infoblocks[index] = !this.infoblocks[index];
  }

  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {
    this.destroy$.next();

    this.destroy$.complete();
  }
}
