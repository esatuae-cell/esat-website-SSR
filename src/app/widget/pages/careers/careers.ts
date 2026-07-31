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
  // ============================================================
  // Inject
  // ============================================================

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  public root = inject(RootServices);

  // ============================================================
  // SSR / Browser
  // ============================================================

  readonly isBrowser = isPlatformBrowser(this.platformId);

  // ============================================================
  // State
  // ============================================================

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

  readonly httpDirectLink = 'https://esat.ae/wp-json/wp/v2/pages/';

  angForm!: FormGroup;

  selectedFile: File | null = null;

  loading = false;

  // ============================================================
  // Init
  // ============================================================

  ngOnInit(): void {
    this.titleService.setTitle('Job Vacancies and Careers | UAE | ESAT');

    this.metaService.updateTag({
      name: 'description',
      content: 'Want to work with ESAT? Find out about careers with us and our current vacancies.',
    });

    this.root.contactoption = 0;

    /*
     * Try to use already loaded WordPress data first.
     * This avoids an unnecessary API request during SSR
     * when RootServices already contains page 203.
     */
    const careerData = this.root.webData?.['203'];

    if (careerData?.acf) {
      this.setCareerData(careerData);
    } else {
      this.loadCareerData();
    }

    this.createForm();
  }

  // ============================================================
  // Career Data
  // ============================================================

  private setCareerData(data: any): void {
    if (!data || typeof data !== 'object') {
      return;
    }

    if (!data.acf || typeof data.acf !== 'object') {
      return;
    }

    this.dataValue = data;

    this.preparejobcategory(data);
  }

  // ============================================================
  // API
  // ============================================================

  loadCareerData(): void {
    /*
     * During SSR/prerendering, the WordPress endpoint may return
     * the Angular HTML page instead of JSON.
     *
     * We therefore handle the request safely and never assume
     * that the response contains ACF data.
     */

    this.http
      .get<any>(`${this.httpDirectLink}203`)
      .pipe(
        catchError((error) => {
          console.error('Career API request failed:', error?.status, error?.url);

          return of(null);
        }),
      )
      .subscribe((data: any) => {
        if (!data || typeof data !== 'object') {
          return;
        }

        if (!data.acf || typeof data.acf !== 'object') {
          console.warn('Career API returned data without ACF information.');

          return;
        }

        this.setCareerData(data);
      });
  }

  // ============================================================
  // Jobs
  // ============================================================

  preparejobcategory(dataValue: any): void {
    this.jobCategory = [];

    if (
      !dataValue ||
      typeof dataValue !== 'object' ||
      !dataValue.acf ||
      typeof dataValue.acf !== 'object'
    ) {
      return;
    }

    const acf = dataValue.acf;

    for (const key of Object.keys(acf)) {
      if (key === 'content' || key === 'main_image' || key === 'inner_image' || key === 'quotes') {
        continue;
      }

      let label = 'Other Careers';

      switch (key) {
        case 'software_jobs':
          label = 'Software Careers';
          break;

        case 'hardware_jobs':
          label = 'Hardware Careers';
          break;

        case 'sales_marketing':
          label = 'Sales & Marketing Careers';
          break;

        case 'admin_jobs':
          label = 'Administrative Careers';
          break;
      }

      const list = Array.isArray(acf[key]) ? acf[key] : [];

      this.jobCategory.push({
        category: label,
        joblist: list,
        show: false,
        available: list.length > 0,
      });
    }
  }

  toggelBlock(index: number): void {
    this.infoblocks[index] = !this.infoblocks[index];
  }

  // ============================================================
  // Form
  // ============================================================

  createForm(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],

      address: ['', [Validators.required, Validators.email]],

      phone_no: ['', Validators.pattern(/^[0-9]{10}$/)],

      Subject: [this.subjectvalue, Validators.required],

      textarea: [''],
    });
  }

  // ============================================================
  // Job Selection
  // ============================================================

  openSCarrer(id: number): void {
    const jobs = this.dataValue?.acf?.software_jobs;

    if (!Array.isArray(jobs)) {
      return;
    }

    this.SCSingle = jobs[id] ?? null;

    if (this.SCSingle) {
      this.subjectvalue = this.SCSingle?.title ?? 'Job Application';

      this.resetForm();
    }
  }

  openACarrer(id: number): void {
    const jobs = this.dataValue?.acf?.admin_jobs;

    if (!Array.isArray(jobs)) {
      return;
    }

    this.SCSingle = jobs[id] ?? null;

    if (this.SCSingle) {
      this.subjectvalue = this.SCSingle?.title ?? 'Job Application';

      this.resetForm();
    }
  }

  openCarrerPopup(_id: number, job: any): void {
    if (!job) {
      return;
    }

    this.SCSingle = job;

    this.subjectvalue = job?.title ?? 'Job Application';

    this.resetForm();
  }

  openForm(): void {
    this.swcbody = !this.swcbody;
  }

  // ============================================================
  // File
  // ============================================================

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

  // ============================================================
  // SweetAlert - Browser Only
  // ============================================================

  async showAlert(title: string, text: string, icon: any): Promise<void> {
    if (!this.isBrowser) {
      return;
    }

    const Swal = (await import('sweetalert2')).default;

    await Swal.fire({
      title,
      text,
      icon,
    });
  }

  // ============================================================
  // Submit
  // ============================================================

  onSubmit(): void {
    if (!this.angForm || this.angForm.invalid || !this.selectedFile) {
      void this.showAlert('Invalid', 'Please fill all required fields', 'error');

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('subject', this.angForm.value.Subject ?? '');

    formData.append('name', this.angForm.value.name ?? '');

    formData.append('phone', this.angForm.value.phone_no ?? '');

    formData.append('email', this.angForm.value.address ?? '');

    formData.append('message', this.angForm.value.textarea ?? '');

    formData.append('file', this.selectedFile);

    this.http
      .post('https://esat.ae/wp-content/themes/ESAT/api/emailapi/career-fileupload.php', formData)
      .pipe(
        catchError((error) => {
          console.error('Career upload error:', error);

          this.loading = false;

          void this.showAlert('Error', 'Something went wrong', 'error');

          return of(null);
        }),
      )
      .subscribe((res: any) => {
        this.loading = false;

        if (res?.id === 203) {
          void this.showAlert('Thank You!', 'Your CV has been sent successfully.', 'success');

          this.resetForm();
        }
      });
  }

  // ============================================================
  // Reset
  // ============================================================

  resetForm(): void {
    if (!this.angForm) {
      return;
    }

    this.angForm.reset({
      Subject: this.subjectvalue,
    });

    this.resetFile();
  }
}
