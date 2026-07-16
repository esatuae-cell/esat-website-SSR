import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";

@Component({
  selector: 'app-audio-visual',
  imports: [HardwareSubMenu, HardwareSubSndMenu],
  templateUrl: './audio-visual.html',
  styleUrl: './audio-visual.css',
})
export class AudioVisual {}
