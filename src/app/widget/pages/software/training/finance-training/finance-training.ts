import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-finance-training',
  imports: [TrainingSubMenu],
  templateUrl: './finance-training.html',
  styleUrl: './finance-training.css',
})
export class FinanceTraining {}
