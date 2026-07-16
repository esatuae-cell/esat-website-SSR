import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";

@Component({
  selector: 'app-elv-solution',
  imports: [HardwareSubMenu, HardwareSubSndMenu],
  templateUrl: './elv-solution.html',
  styleUrl: './elv-solution.css',
})
export class ElvSolution {}
