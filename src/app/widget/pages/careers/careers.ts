import { Component, PLATFORM_ID, inject, OnInit } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Title, Meta } from '@angular/platform-browser';

import { catchError, of } from 'rxjs';

import { RootServices } from '../../../services/root-services';

import { CareersLoad } from '../../shared-component/careers-load/careers-load';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CareersLoad],
  templateUrl: './careers.html',
  styleUrl: './careers.css',
})
export class Careers implements OnInit {
  // ---------- Inject ----------

  private http = inject(HttpClient);

  private fb = inject(FormBuilder);

  private titleService = inject(Title);

  private metaService = inject(Meta);

  private platformId = inject(PLATFORM_ID);

  public root = inject(RootServices);

  // ---------- SSR Browser Check ----------

  isBrowser = isPlatformBrowser(this.platformId);

  // ---------- State ----------

  queone = true;
  quetwo = true;
  quethree = true;
  quefour = true;

  swcbody = true;

  dataValue: any = null;

  SCSingle: any = null;

  subjectvalue = 'Job Application';

  filename = '';

  jobCategory: any[] = [];

  infoblocks: Record<number, boolean> = {};

  httpDirectLink = 'https://esat.ae/wp-json/wp/v2/pages/';

  angForm!: FormGroup;

  selectedFile: File | null = null;

  loading = false;

  // ---------- Init ----------

  ngOnInit(): void {
    this.titleService.setTitle('Job Vacancies and Careers | UAE | ESAT');

    this.metaService.updateTag({
      name: 'description',

      content: 'Want to work with ESAT? Find out about careers with us and our current vacancies.',
    });

    this.root.contactoption = 0;

    if (this.root.webData?.['203']) {
      this.dataValue = this.root.webData['203'];

      this.preparejobcategory(this.dataValue);
    } else {
      this.loadCareerData();
    }

    this.createForm();
  }

  // ---------- API ----------

  loadCareerData(): void {
    this.http
      .get(this.httpDirectLink + '203')
      .pipe(
        catchError((error) => {
          console.error('Career API Error', error);

          return of(null);
        }),
      )
      .subscribe((data: any) => {
        if (data) {
          this.dataValue = data;

          this.preparejobcategory(data);
        }
      });
  }

  // ---------- Jobs ----------

  preparejobcategory(_dataValue: any): void {
    this.jobCategory = [];

    if (!_dataValue || !_dataValue.acf) {
      return;
    }

    for (const key in _dataValue.acf) {
      if (key !== 'content' && key !== 'main_image' && key !== 'inner_image' && key !== 'quotes') {
        const label =
          key === 'software_jobs'
            ? 'Software Careers'
            : key === 'hardware_jobs'
              ? 'Hardware Careers'
              : key === 'sales_marketing'
                ? 'Sales & Marketing Careers'
                : key === 'admin_jobs'
                  ? 'Administrative Careers'
                  : 'Other Careers';

        const list = _dataValue.acf[key] || [];

        this.jobCategory.push({
          category: label,

          joblist: list,

          show: false,

          available: list.length > 0,
        });
      }
    }
  }

  toggelBlock(index: number): void {
    this.infoblocks[index] = !this.infoblocks[index];
  }

  // ---------- Form ----------

  createForm(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],

      address: ['', [Validators.required, Validators.email]],

      phone_no: ['', Validators.pattern(/^[0-9]{10}$/)],

      Subject: [this.subjectvalue, Validators.required],

      textarea: [''],
    });
  }

  // ---------- Job Selection ----------

  openSCarrer(id: number): void {
    this.SCSingle = this.dataValue?.acf?.software_jobs?.[id];

    if (this.SCSingle) {
      this.subjectvalue = this.SCSingle.title;

      this.resetForm();
    }
  }

  openACarrer(id: number): void {
    this.SCSingle = this.dataValue?.acf?.admin_jobs?.[id];

    if (this.SCSingle) {
      this.subjectvalue = this.SCSingle.title;

      this.resetForm();
    }
  }

  openCarrerPopup(_id: number, job: any): void {
    this.SCSingle = job;

    this.subjectvalue = job.title;

    this.resetForm();
  }

  openForm(): void {
    this.swcbody = !this.swcbody;
  }

  // ---------- File ----------

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    this.filename = this.selectedFile.name;
  }

  resetFile(): void {
    this.selectedFile = null;

    this.filename = '';
  }

  // ---------- Sweet Alert SSR Safe ----------

  async showAlert(title: string, text: string, icon: any) {
    if (this.isBrowser) {
      const Swal = (await import('sweetalert2')).default;

      Swal.fire({
        title,

        text,

        icon,
      });
    }
  }

  // ---------- Submit ----------

  onSubmit(): void {
    if (!this.angForm.valid || !this.selectedFile) {
      this.showAlert(
        'Invalid',

        'Please fill all required fields',

        'error',
      );

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('subject', this.angForm.value.Subject);

    formData.append('name', this.angForm.value.name);

    formData.append('phone', this.angForm.value.phone_no);

    formData.append('email', this.angForm.value.address);

    formData.append('message', this.angForm.value.textarea);

    formData.append('file', this.selectedFile);

    this.http
      .post(
        'https://esat.ae/wp-content/themes/ESAT/api/emailapi/career-fileupload.php',

        formData,
      )
      .pipe(
        catchError((error) => {
          console.error('Upload Error', error);

          this.loading = false;

          this.showAlert(
            'Error',

            'Something went wrong',

            'error',
          );

          return of(null);
        }),
      )
      .subscribe((res: any) => {
        this.loading = false;

        if (res?.id === 203) {
          this.showAlert(
            'Thank You!',

            'Your CV has been sent successfully.',

            'success',
          );

          this.resetForm();
        }
      });
  }

  // ---------- Reset ----------

  resetForm(): void {
    this.angForm.reset({
      Subject: this.subjectvalue,
    });

    this.resetFile();
  }
}
