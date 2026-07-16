import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-organization-training',
  imports: [TrainingSubMenu],
  templateUrl: './organization-training.html',
  styleUrl: './organization-training.css',
})
export class OrganizationTraining {}
