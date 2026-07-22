import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-budget-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './budget-training.html',
  styleUrl: './budget-training.css',
})
export class BudgetTraining {}
