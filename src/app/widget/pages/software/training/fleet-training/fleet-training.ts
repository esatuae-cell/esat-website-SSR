import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fleet-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './fleet-training.html',
  styleUrl: './fleet-training.css',
})
export class FleetTraining {}
