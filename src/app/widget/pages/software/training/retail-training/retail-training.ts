import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-retail-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './retail-training.html',
  styleUrl: './retail-training.css',
})
export class RetailTraining {}
