import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quality-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './quality-training.html',
  styleUrl: './quality-training.css',
})
export class QualityTraining {}
