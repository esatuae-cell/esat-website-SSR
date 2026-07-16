import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";

@Component({
  selector: 'app-security-audit',
  imports: [HardwareSubMenu, HardwareSubSndMenu],
  templateUrl: './security-audit.html',
  styleUrl: './security-audit.css',
})
export class SecurityAudit {}
