import { Component } from '@angular/core';
import { SwCommon } from "../../sw-common/sw-common";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-business-home-layout',
  imports: [ SwCommon, RouterOutlet],
  templateUrl: './business-home-layout.html',
  styleUrl: './business-home-layout.css',
})
export class BusinessHomeLayout {}
