import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-finance-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './finance-training.html',
  styleUrl: './finance-training.css',
})
export class FinanceTraining {}
