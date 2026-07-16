import { Component } from '@angular/core';
import { SwCommon } from '../sw-common/sw-common';

@Component({
  selector: 'app-erp-feature',
  standalone: true,
  imports: [SwCommon],
  templateUrl: './erp-feature.html',
  styleUrl: './erp-feature.css',
})
export class ErpFeature {
  openPDF() {
    window.open('/assets/first-quality.pdf', '_blank');
  }
}
