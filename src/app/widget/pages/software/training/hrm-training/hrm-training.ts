import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hrm-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './hrm-training.html',
  styleUrl: './hrm-training.css',
})
export class HrmTraining {}
