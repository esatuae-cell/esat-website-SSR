import { Component } from '@angular/core';
import { SwCommon } from "../../sw-common/sw-common";
import { AboutRoutingModule } from "../../../about/about-routing-module";

@Component({
  selector: 'app-training-layout',
  imports: [SwCommon, AboutRoutingModule],
  templateUrl: './training-layout.html',
  styleUrl: './training-layout.css',
})
export class TrainingLayout {}
