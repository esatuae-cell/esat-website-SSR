import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payroll-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './payroll-training.html',
  styleUrl: './payroll-training.css',
})
export class PayrollTraining {}
