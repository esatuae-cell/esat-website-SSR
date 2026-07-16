import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-inventory-training',
  imports: [TrainingSubMenu],
  templateUrl: './inventory-training.html',
  styleUrl: './inventory-training.css',
})
export class InventoryTraining {}
