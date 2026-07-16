import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RootServices } from '../../../../services/root-services';
import { CommonModule } from '@angular/common';
import { SwCommon } from '../sw-common/sw-common';

@Component({
  selector: 'app-erp-training',
  imports: [CommonModule, SwCommon],
  templateUrl: './erp-training.html',
  styleUrl: './erp-training.css',
})
export class ErpTraining {}
