import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import Swal from 'sweetalert2';
import { RootServices } from '../../../../services/root-services';

@Component({
  selector: 'app-certificate-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './certificate-verify.html',
  styleUrl: './certificate-verify.css',
})
export class CertificateVerify {
  // ✅ FIX: remove undefined issue
  angForm!: FormGroup;

  cerurl: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private _location: Location,
    public $rootScope: RootServices,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.createForm();
  }

  ngOnInit() {}

  // ✅ Form initialization
  createForm() {
    this.angForm = this.fb.group({
      uname: [
        'ESAT-XX-TR-00X',
        [Validators.required, Validators.minLength(14)],
      ],
    });
  }

  // ✅ SSR-safe submit
  async onSubmit() {
    const uname = this.angForm.value.uname;
    const url = `assets/images/certi/${uname}.jpg`;

    try {
      // browser-only check
      if (isPlatformBrowser(this.platformId)) {
        const res = await fetch(url, { method: 'HEAD' });

        if (!res.ok) {
          this.cerurl = '';
          Swal.fire('Invalid!', 'No Certificate found.', 'error');
          return;
        }
      }

      this.cerurl = url;
    } catch (err) {
      console.error(err);
      this.cerurl = '';
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  }

  // ✅ SSR-safe download
  async forceDownload() {
    if (!this.cerurl) {
      Swal.fire('Error', 'No certificate to download', 'error');
      return;
    }

    const uname = this.angForm.value.uname;
    const fileName = `${uname}.jpg`;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const blob = await firstValueFrom(
        this.http.get(this.cerurl, { responseType: 'blob' })
      );

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not download file', 'error');
    }
  }
}