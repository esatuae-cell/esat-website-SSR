import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-physical-survilance',
  imports: [HardwareSubMenu, HardwareSubSndMenu,RouterLink],
  templateUrl: './physical-survilance.html',
  styleUrl: './physical-survilance.css',
})
export class PhysicalSurvilance {}
