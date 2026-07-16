import { Component } from '@angular/core';
import { ClientSlider } from '../../shared-component/client-slider/client-slider';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientSlider],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {}
