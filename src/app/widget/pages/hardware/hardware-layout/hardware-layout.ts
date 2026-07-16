import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { AboutRoutingModule } from "../../about/about-routing-module";

@Component({
  selector: 'app-hardware-layout',
  imports: [ AboutRoutingModule],
  templateUrl: './hardware-layout.html',
  styleUrl: './hardware-layout.css',
})
export class HardwareLayout {}
