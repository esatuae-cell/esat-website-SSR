import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';

import { RootServices } from '../../../services/root-services';

@Component({
  selector: 'app-careers-load',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './careers-load.html',
  styleUrl: './careers-load.css',
})
export class CareersLoad implements OnInit {
  jobData: any[] = [];
  jobCategory: any[] = [];

  selectedCategoryIndex: number | null = null;
  selectedJob: any = null;

  swcbody = true;
  showPopup = false;
  showForm = false;

  applicationForm: FormGroup;
  selectedFile: File | null = null;

  jobDataLoaded = false;
  dataValue: any;
  infoblocks: { [key: number]: boolean } = {};

  httpDirectLink = 'https://esat.ae/wp-json/wp/v2/pages/';

  isBrowser: boolean;

  afuConfig: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public root: RootServices,
    private titleService: Title,
    private meta: Meta,
    private ref: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      phone_no: ['', Validators.required],
      subject: [{ value: '', disabled: true }, Validators.required],
      textarea: [''],
      resume: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.root.contactoption = 0;

    /*
     * Browser-only DOM access
     */
    if (this.isBrowser) {
      const loader = document.getElementById('loadingshield');

      if (loader) {
        loader.style.display = 'none';
      }
    }

    /*
     * Initialize upload configuration
     */
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.docx,.pdf',
      maxSize: '2',
      uploadAPI: {
        url: this.root.apiLink + '/resumeFile.php',
      },
      hideResetBtn: true,
      replaceTexts: {
        uploadBtn: 'Upload your CV',
      },
    };

    /*
     * Load career data
     */
    this.loadCareerData();
  }

  private loadCareerData(): void {
    this.jobDataLoaded = false;

    const cachedData = this.root.webData?.['203'];

    if (cachedData) {
      this.dataValue = cachedData;
      this.preparejobcategory(cachedData);
      this.jobDataLoaded = true;
      return;
    }

    this.http.get(this.root.httpLink + '203').subscribe({
      next: (data: any) => {
        this.dataValue = data;

        this.preparejobcategory(data);

        this.jobDataLoaded = true;

        /*
         * Normally Angular change detection handles this.
         * Keep this only for cases where the component is updated
         * outside the normal Angular lifecycle.
         */
        if (this.isBrowser) {
          this.ref.markForCheck();
        }
      },

      error: (error) => {
        console.error('Career data loading error:', error);

        this.jobDataLoaded = true;

        if (this.isBrowser) {
          this.ref.markForCheck();
        }
      },
    });
  }

  preparejobcategory(dataValue: any): void {
    this.jobCategory = [];

    if (!dataValue?.acf) {
      return;
    }

    const labelMap: { [key: string]: string } = {
      software_jobs: 'Software Careers',
      hardware_jobs: 'Hardware Careers',
      sales_marketing: 'Sales & Marketing Careers',
      admin_jobs: 'Administrative Careers',
    };

    for (const key in dataValue.acf) {
      if (['content', 'main_image', 'inner_image', 'quotes'].includes(key)) {
        continue;
      }

      const jobs = dataValue.acf[key] || [];

      this.jobCategory.push({
        category: labelMap[key] || 'Other Careers',
        joblist: jobs,
        show: false,
        available: jobs.length > 0,
      });
    }
  }

  toggleAccordion(index: number): void {
    this.selectedCategoryIndex = this.selectedCategoryIndex === index ? null : index;
  }

  openJobPopup(job: any): void {
    this.selectedJob = job;

    this.showPopup = true;
    this.showForm = false;

    this.applicationForm.patchValue({
      subject: job?.title || '',
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedJob = null;
    this.showForm = false;
    this.selectedFile = null;

    this.applicationForm.reset();
  }

  showApplicationForm(): void {
    this.showForm = true;
  }

  submitApplication(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('name', this.applicationForm.get('name')?.value || '');

    formData.append('email', this.applicationForm.get('address')?.value || '');

    formData.append('phone', this.applicationForm.get('phone_no')?.value || '');

    formData.append('subject', this.selectedJob?.title || 'Job Application');

    formData.append('message', this.applicationForm.get('textarea')?.value || '');

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    const backendUrl = 'https://esat.ae/wp-content/themes/ESAT/api/emailapi/career-fileupload.php';

    this.http.post(backendUrl, formData).subscribe({
      next: () => {
        this.closePopup();
      },

      error: (error) => {
        console.error('Submission error:', error);
      },
    });
  }

  onFileChange(event: Event): void {
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

  toggleBlock(index: number): void {
    if (!this.isBrowser) {
      return;
    }

    this.infoblocks[index] = !this.infoblocks[index];
  }
}
