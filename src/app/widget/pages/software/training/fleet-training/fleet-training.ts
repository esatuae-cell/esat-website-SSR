import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-fleet-training',
  imports: [TrainingSubMenu],
  templateUrl: './fleet-training.html',
  styleUrl: './fleet-training.css',
})
export class FleetTraining {}
