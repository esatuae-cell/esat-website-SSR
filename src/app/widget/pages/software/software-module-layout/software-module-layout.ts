import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SwCommon } from '../sw-common/sw-common';

@Component({
  selector: 'app-software-module-layout',
  imports: [RouterOutlet, SwCommon],
  templateUrl: './software-module-layout.html',
  styleUrl: './software-module-layout.css',
})
export class SoftwareModuleLayout {}
