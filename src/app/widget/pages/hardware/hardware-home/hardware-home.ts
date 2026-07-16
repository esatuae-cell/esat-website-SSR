import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HardwareHomeBoxed } from "../hardware-home-boxed/hardware-home-boxed";
import { HardwareSubMenu } from "../hardware-sub-menu/hardware-sub-menu";

@Component({
  selector: 'app-hardware-home',
  imports: [RouterLink, HardwareHomeBoxed, HardwareSubMenu],
  templateUrl: './hardware-home.html',
  styleUrl: './hardware-home.css',
})
export class HardwareHome {}
