import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-payroll-training',
  imports: [TrainingSubMenu],
  templateUrl: './payroll-training.html',
  styleUrl: './payroll-training.css',
})
export class PayrollTraining {}
