import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hcm-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './hcm-training.html',
  styleUrl: './hcm-training.css',
})
export class HcmTraining {}
