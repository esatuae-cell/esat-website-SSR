import { Component } from '@angular/core';
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";
import { HardwareSubSndMenu } from "../hardware-sub-snd-menu/hardware-sub-snd-menu";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-security-audit',
  imports: [HardwareSubMenu, HardwareSubSndMenu,RouterLink],
  templateUrl: './security-audit.html',
  styleUrl: './security-audit.css',
})
export class SecurityAudit {}
