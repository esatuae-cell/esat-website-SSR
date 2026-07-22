import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-audio-visual',
  imports: [HardwareSubMenu, HardwareSubSndMenu,RouterLink],
  templateUrl: './audio-visual.html',
  styleUrl: './audio-visual.css',
})
export class AudioVisual {}
