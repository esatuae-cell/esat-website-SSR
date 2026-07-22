import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cmms-training',
  imports: [TrainingSubMenu,RouterLink],
  templateUrl: './cmms-training.html',
  styleUrl: './cmms-training.css',
})
export class CmmsTraining {}
