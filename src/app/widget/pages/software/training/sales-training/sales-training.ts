import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './sales-training.html',
  styleUrl: './sales-training.css',
})
export class SalesTraining {}
