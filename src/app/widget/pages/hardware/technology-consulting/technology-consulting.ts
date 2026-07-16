import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";

@Component({
  selector: 'app-technology-consulting',
  imports: [HardwareSubMenu, HardwareSubSndMenu],
  templateUrl: './technology-consulting.html',
  styleUrl: './technology-consulting.css',
})
export class TechnologyConsulting {}
