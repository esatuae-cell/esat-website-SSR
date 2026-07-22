import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manufacturing-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './manufacturing-training.html',
  styleUrl: './manufacturing-training.css',
})
export class ManufacturingTraining {}
