import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-sales-training',
  imports: [TrainingSubMenu],
  templateUrl: './sales-training.html',
  styleUrl: './sales-training.css',
})
export class SalesTraining {}
