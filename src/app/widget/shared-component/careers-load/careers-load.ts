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
  swcbody: boolean = true;
  showPopup = false;
  showForm = false;

  applicationForm: FormGroup;
  selectedFile: File | null = null;

  jobDataLoaded = false;
  dataValue: any;
  infoblocks: any = {};

  httpDirectLink = 'https://esat.ae/wp-json/wp/v2/pages/';

  // SSR safe flag
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

    // SSR safe DOM access
    if (this.isBrowser) {
      const loader = document.getElementById('loadingshield');
      if (loader) loader.style.display = 'none';
    }
    this.jobDataLoaded = false;
    this.ref.detectChanges();
    if (this.root.webData?.['203']) {
      this.dataValue = this.root.webData['203'];
      this.preparejobcategory(this.dataValue);
      this.jobDataLoaded = true;
      this.ref.detectChanges();
    } else {
      this.http.get(this.root.httpLink + '203').subscribe((data: any) => {
        this.dataValue = data;
        this.preparejobcategory(this.dataValue);
        this.jobDataLoaded = true;
        this.ref.detectChanges();
      });
    }

    // safe config init (NO this usage in property initializer)
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
  }

  preparejobcategory(_dataValue: any): void {
    this.jobCategory = [];

    for (const key in _dataValue.acf) {
      if (['content', 'main_image', 'inner_image', 'quotes'].includes(key)) {
        continue;
      }

      const labelMap: any = {
        software_jobs: 'Software Careers',
        hardware_jobs: 'Hardware Careers',
        sales_marketing: 'Sales & Marketing Careers',
        admin_jobs: 'Administrative Careers',
      };

      const label = labelMap[key] || 'Other Careers';

      this.jobCategory.push({
        category: label,
        joblist: _dataValue.acf[key] || [],
        show: false,
        available: (_dataValue.acf[key] || []).length > 0,
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
      subject: job.title,
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedJob = null;
    this.showForm = false;
    this.applicationForm.reset();
  }

  showApplicationForm(): void {
    this.showForm = true;
  }

  submitApplication(): void {
    if (!this.applicationForm.valid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.applicationForm.get('name')?.value);
    formData.append('email', this.applicationForm.get('address')?.value);
    formData.append('phone', this.applicationForm.get('phone_no')?.value);
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
      error: (err) => {
        console.error('Submission error', err);
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;
    this.applicationForm.patchValue({ resume: file });
  }

  // SSR-safe block toggle
  toggleBlock(index: number): void {
    if (!this.isBrowser) return;
    this.infoblocks[index] = !this.infoblocks[index];
  }
}
