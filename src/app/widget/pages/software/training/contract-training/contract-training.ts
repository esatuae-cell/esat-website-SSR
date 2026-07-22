import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contract-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './contract-training.html',
  styleUrl: './contract-training.css',
})
export class ContractTraining {}
