import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-budget-training',
  imports: [TrainingSubMenu],
  templateUrl: './budget-training.html',
  styleUrl: './budget-training.css',
})
export class BudgetTraining {}
