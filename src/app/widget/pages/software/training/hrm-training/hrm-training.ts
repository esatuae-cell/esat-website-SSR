import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-hrm-training',
  imports: [TrainingSubMenu],
  templateUrl: './hrm-training.html',
  styleUrl: './hrm-training.css',
})
export class HrmTraining {}
