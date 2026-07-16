import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-shipment-training',
  imports: [TrainingSubMenu],
  templateUrl: './shipment-training.html',
  styleUrl: './shipment-training.css',
})
export class ShipmentTraining {}
