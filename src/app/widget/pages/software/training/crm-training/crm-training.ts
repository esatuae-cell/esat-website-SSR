import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-crm-training',
  imports: [TrainingSubMenu],
  templateUrl: './crm-training.html',
  styleUrl: './crm-training.css',
})
export class CrmTraining {}
