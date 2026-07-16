import { Component } from '@angular/core';
import { TrainingSubMenu } from "../training-sub-menu/training-sub-menu";

@Component({
  selector: 'app-cmms-training',
  imports: [TrainingSubMenu],
  templateUrl: './cmms-training.html',
  styleUrl: './cmms-training.css',
})
export class CmmsTraining {}
