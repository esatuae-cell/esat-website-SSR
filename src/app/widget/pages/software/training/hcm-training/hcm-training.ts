import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-hcm-training',
  imports: [TrainingSubMenu],
  templateUrl: './hcm-training.html',
  styleUrl: './hcm-training.css',
})
export class HcmTraining {}
