import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [
    CommonModule,        // ✅ FIX FOR *ngIf / *ngFor
    ReactiveFormsModule  // forms support
  ],
  templateUrl: './trail.html',
  styleUrls: ['./trail.css'],
})
export class TrailComponent {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);

  // =========================
  // SSR SAFE STATE (signals)
  // =========================
  step = signal<number>(1);
  loading = signal<boolean>(false);

  selectedModules = signal<any[]>([]);

  // =========================
  // MODULE LIST
  // =========================
  modules = [
      { name: 'Fixed Asset', icon: 'icon-moduleiconassets_icon' },
    { name: 'CRM', icon: 'icon-moduleiconcrm_icon' },
    { name: 'Facility & Service', icon: 'icon-moduleiconfacilitymanagement_icon' },
    { name: 'Finance & Accounts', icon: 'icon-moduleiconfinancemanagement' },
    { name: 'Human Resource', icon: 'icon-moduleiconhrm_icon' },
    { name: 'Human Capital', icon: 'icon-moduleiconhcm_icon' },
    { name: 'Payroll', icon: 'icon-moduleicon_payrollicon' },
    { name: 'Sub-Contract', icon: 'icon-moduleiconcont_icon' },
    { name: 'Inventory', icon: 'icon-moduleiconlogistic_icon' },
    { name: 'Procurement', icon: 'icon-moduleiconprocurement_icon' },
    { name: 'Sales', icon: 'icon-font-20' },
    { name: 'Budget and Project', icon: 'icon-icon-project' },
    { name: 'Property', icon: 'icon-moduleiconrealestate_icon' },
    { name: 'Manufacturing', icon: 'icon-moduleicontask_icon' },
    { name: 'Organization', icon: 'icon-odesatodmodicon' },

    { name: 'POS', image: 'assets/images/retail-nav.svg' },
    { name: 'Warehouse', image: 'assets/images/warehouse-nav.svg' },
    { name: 'Fleet & Transportation', image: 'assets/images/fleet-nav.svg' },
    { name: 'CMMS', image: 'assets/images/cmms-nav.svg' },
    { name: 'Shipping/Logistics', image: 'assets/images/shipment-nav.svg' },
    { name: 'Quality Management', image: 'assets/images/quality-nav.svg' }
  ];

  // =========================
  // REACTIVE FORM (SSR SAFE)
  // =========================
  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    companyName: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    country: ['', [Validators.required]],
    language: [''],
    companySize: ['']
  });

  // =========================
  // MODULE HANDLING (IMMUTABLE)
  // =========================

  toggleModule(module: any) {
    const current = this.selectedModules();

    const exists = current.find(m => m.name === module.name);

    if (exists) {
      this.selectedModules.set(
        current.filter(m => m.name !== module.name)
      );
    } else {
      this.selectedModules.set([...current, module]);
    }
  }

  isSelected(module: any): boolean {
    return this.selectedModules().some(m => m.name === module.name);
  }

  removeModule(module: any) {
    this.selectedModules.set(
      this.selectedModules().filter(m => m.name !== module.name)
    );
  }

  // =========================
  // STEP NAVIGATION
  // =========================

  goToForm() {
    if (this.selectedModules().length === 0) return;
    this.step.set(2);
  }

  goBack() {
    this.step.set(1);
  }

  goToReview() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.step.set(3);
  }

  editForm() {
    this.step.set(2);
  }

  // =========================
  // SUBMIT (SSR SAFE)
  // =========================

  submit() {

    if (!isPlatformBrowser(this.platformId)) return; // SSR GUARD

    this.loading.set(true);

    const payload = {
      ...this.form.value,
      selectedModules: this.selectedModules()
    };

    this.http.post(
      'https://esat.ae/wp-content/themes/ESAT/api/emailapi/trail-mail.php',
      payload
    ).subscribe({
      next: () => {
        this.loading.set(false);

        // SSR-safe UI feedback (no alert in real production)
        console.log('Success');

        // reset
        this.step.set(1);
        this.selectedModules.set([]);
        this.form.reset();
      },

      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}