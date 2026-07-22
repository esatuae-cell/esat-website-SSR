import { Component } from '@angular/core';
import { ClientSlider } from '../../shared-component/client-slider/client-slider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientSlider,RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {}
