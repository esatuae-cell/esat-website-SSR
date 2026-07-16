import { Component } from '@angular/core';
import { PartnershipForm } from "../../shared-component/partnership-form/partnership-form";

@Component({
  selector: 'app-partnership',
  imports: [PartnershipForm],
  templateUrl: './partnership.html',
  styleUrl: './partnership.css',
})
export class Partnership {}
