import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crm-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './crm-training.html',
  styleUrl: './crm-training.css',
})
export class CrmTraining {}
