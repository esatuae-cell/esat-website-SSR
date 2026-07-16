import { Component } from '@angular/core';
import { HardwareRoutingModule } from '../hardware-routing-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hardware-home-boxed',
  imports: [RouterLink],
  templateUrl: './hardware-home-boxed.html',
  styleUrl: './hardware-home-boxed.css',
})
export class HardwareHomeBoxed {}
