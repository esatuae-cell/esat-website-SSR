import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css'],
})
export class FeedbackComponent implements OnInit {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  feedbackForm!: FormGroup;

  currentStep = 1;
  isCompleted = false;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({

      name: ['', Validators.required],

      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]
      ],

      email: ['', [Validators.required, Validators.email]],

      company: ['', Validators.required],

      about: ['Software', Validators.required],

      qusone: ['', Validators.required],

      qustwo: ['', Validators.required],

      qusthree: ['', Validators.required],

      qusfour: ['Very Satisfied', Validators.required],

      qusfive: ['Very Satisfied', Validators.required],

      message: ['', Validators.required],
    });
  }

  nextStep(): void {
    this.feedbackForm.markAllAsTouched();

    if (!this.isStepValid(this.currentStep)) return;

    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private isStepValid(step: number): boolean {

    const f = this.feedbackForm.controls;

    switch (step) {

      case 1:
        return (
          f['name'].valid &&
          f['mobile'].valid &&
          f['email'].valid &&
          f['company'].valid &&
          f['about'].valid
        );

      case 2:
        return (
          f['qusone'].valid &&
          f['qustwo'].valid &&
          f['qusthree'].valid
        );

      case 3:
        return f['message'].valid;

      default:
        return true;
    }
  }

  submit(): void {

    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const payload = this.feedbackForm.value;

    this.http.post(
      'https://esat.ae/wp-content/themes/ESAT/api/emailapi/feedback-form.php',
      payload
    ).subscribe({

      next: () => {

        this.isCompleted = true;
        this.currentStep = 5;

        Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'Your feedback has been submitted successfully.',
        }).then(() => {
          this.router.navigate(['/contact']);
        });

      },

      error: () => {

        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Please try again later.',
        });

      }

    });

  }
}