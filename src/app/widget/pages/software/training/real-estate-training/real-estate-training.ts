import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-real-estate-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './real-estate-training.html',
  styleUrl: './real-estate-training.css',
})
export class RealEstateTraining {}
