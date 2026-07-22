import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shipment-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './shipment-training.html',
  styleUrl: './shipment-training.css',
})
export class ShipmentTraining {}
