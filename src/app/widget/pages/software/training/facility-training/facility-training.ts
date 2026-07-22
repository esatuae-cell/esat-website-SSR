import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-facility-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './facility-training.html',
  styleUrl: './facility-training.css',
})
export class FacilityTraining {}
