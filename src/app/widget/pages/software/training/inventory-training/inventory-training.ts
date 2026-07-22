import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './inventory-training.html',
  styleUrl: './inventory-training.css',
})
export class InventoryTraining {}
