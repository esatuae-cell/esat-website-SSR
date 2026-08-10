import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { RootServices } from '../../../services/root-services';

@Component({
  selector: 'app-careers-load',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './careers-load.html',
  styleUrl: './careers-load.css',
})
export class CareersLoad implements OnInit {
  // --------------------------------------------------
  // Data
  // --------------------------------------------------

  jobData: any[] = [];
  jobCategory: any[] = [];

  dataValue: any = null;

  selectedCategoryIndex: number | null = null;
  selectedJob: any = null;

  // --------------------------------------------------
  // UI State
  // --------------------------------------------------

  swcbody = true;
  showPopup = false;
  showForm = false;
  jobDataLoaded = false;

  infoblocks: Record<number, boolean> = {};

  // --------------------------------------------------
  // Form
  // --------------------------------------------------

  applicationForm: FormGroup;

  selectedFile: File | null = null;

  // --------------------------------------------------
  // Other
  // --------------------------------------------------

  isBrowser = false;

  afuConfig: any = null;

  httpDirectLink = 'https://esat.ae/wp-json/wp/v2/pages/';

  // --------------------------------------------------
  // Constructor
  // --------------------------------------------------

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public root: RootServices,
    private titleService: Title,
    private meta: Meta,
    private ref: ChangeDetectorRef,

    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Create form immediately so template
    // never receives an undefined FormGroup.
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],

      address: ['', [Validators.required, Validators.email]],

      phone_no: ['', Validators.required],

      subject: [{ value: '', disabled: true }, Validators.required],

      textarea: [''],

      resume: [null, Validators.required],
    });
  }

  // --------------------------------------------------
  // Init
  // --------------------------------------------------

  ngOnInit(): void {
    this.root.contactoption = 0;

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

    // ALWAYS load careers when this component is created
    this.loadCareerData();
  }

  // --------------------------------------------------
  // Load Career Data
  // --------------------------------------------------

  private loadCareerData(): void {
    // Start loading
    this.jobDataLoaded = false;

    // Clear old data
    this.dataValue = null;
    this.jobData = [];
    this.jobCategory = [];

    const apiUrl = `${this.root.httpLink}203`;

    console.log('Loading careers from:', apiUrl);

    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        console.log('Career API response:', data);

        if (data && data.acf) {
          this.dataValue = data;

          // IMPORTANT:
          // Build job categories only AFTER API response arrives
          this.preparejobcategory(data);

          console.log('Prepared job categories:', this.jobCategory);

          this.jobDataLoaded = true;
        } else {
          console.error('Career API returned no ACF data:', data);

          this.dataValue = data;

          this.jobData = [];
          this.jobCategory = [];

          this.jobDataLoaded = true;
        }

        if (this.isBrowser) {
          this.ref.detectChanges();
        }
      },

      error: (error) => {
        console.error('Career API Error:', error);

        this.dataValue = null;
        this.jobData = [];
        this.jobCategory = [];

        this.jobDataLoaded = true;

        if (this.isBrowser) {
          this.ref.detectChanges();
        }
      },
    });
  }

  // --------------------------------------------------
  // Prepare Job Categories
  // --------------------------------------------------

  preparejobcategory(dataValue: any): void {
    this.jobCategory = [];

    if (!dataValue?.acf) {
      console.warn('No ACF data found');
      return;
    }

    const labelMap: Record<string, string> = {
      software_jobs: 'Software Careers',
      hardware_jobs: 'Hardware Careers',
      sales_marketing: 'Sales & Marketing Careers',
      admin_jobs: 'Administrative Careers',
    };

    Object.keys(dataValue.acf).forEach((key) => {
      // Ignore non-job fields
      if (['content', 'main_image', 'inner_image', 'quotes'].includes(key)) {
        return;
      }

      const value = dataValue.acf[key];

      // Only accept arrays as job lists
      const jobs = Array.isArray(value) ? value : [];

      console.log(`Career field: ${key}`, jobs);

      this.jobCategory.push({
        category: labelMap[key] || 'Other Careers',
        joblist: jobs,
        show: false,
        available: jobs.length > 0,
      });
    });

    console.log('FINAL jobCategory:', this.jobCategory);
  }

  // --------------------------------------------------
  // Accordion
  // --------------------------------------------------

  toggleAccordion(index: number): void {
    this.selectedCategoryIndex = this.selectedCategoryIndex === index ? null : index;
  }

  // --------------------------------------------------
  // Job Popup
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Close Popup
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Show Application Form
  // --------------------------------------------------

  showApplicationForm(): void {
    if (!this.selectedJob) {
      return;
    }

    this.showForm = true;
  }

  // --------------------------------------------------
  // Submit Application
  // --------------------------------------------------

  submitApplication(): void {
    /*
     * Prevent submission when form is invalid.
     */
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();

      return;
    }

    /*
     * File is required.
     */
    if (!this.selectedFile) {
      this.applicationForm.get('resume')?.setErrors({ required: true });

      this.applicationForm.markAllAsTouched();

      return;
    }

    const formData = new FormData();

    formData.append('name', this.applicationForm.get('name')?.value || '');

    formData.append('email', this.applicationForm.get('address')?.value || '');

    formData.append('phone', this.applicationForm.get('phone_no')?.value || '');

    formData.append('subject', this.selectedJob?.title || 'Job Application');

    formData.append('message', this.applicationForm.get('textarea')?.value || '');

    formData.append('file', this.selectedFile, this.selectedFile.name);

    const backendUrl = 'https://esat.ae/wp-content/themes/ESAT/api/emailapi/career-fileupload.php';

    /*
     * File upload should only happen in browser.
     */
    if (!this.isBrowser) {
      return;
    }

    this.http
      .post(backendUrl, formData)
      .pipe(
        catchError((error) => {
          console.error('Career application submission error:', error);

          return of(null);
        }),
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.closePopup();
          }
        },

        error: (error) => {
          console.error('Unexpected submission error:', error);
        },
      });
  }

  // --------------------------------------------------
  // File Change
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Toggle Information Block
  // --------------------------------------------------

  toggleBlock(index: number): void {
    /*
     * Browser-only interaction.
     */
    if (!this.isBrowser) {
      return;
    }

    this.infoblocks[index] = !this.infoblocks[index];
  }
}
