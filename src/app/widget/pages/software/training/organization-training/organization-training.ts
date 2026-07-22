import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organization-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './organization-training.html',
  styleUrl: './organization-training.css',
})
export class OrganizationTraining {}
