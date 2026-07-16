import { Component } from '@angular/core';
import { TrainingSubMenu } from '../training-sub-menu/training-sub-menu';

@Component({
  selector: 'app-warehouse-training',
  standalone: true,
  imports: [TrainingSubMenu],
  templateUrl: './warehouse-training.html',
  styleUrl: './warehouse-training.css',
})
export class WarehouseTraining {}
