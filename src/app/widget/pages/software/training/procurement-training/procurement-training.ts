import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-procurement-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './procurement-training.html',
  styleUrl: './procurement-training.css',
})
export class ProcurementTraining {}
