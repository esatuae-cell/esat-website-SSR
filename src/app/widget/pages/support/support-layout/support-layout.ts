import { Component } from '@angular/core';
import { SupportNav } from "../support-nav/support-nav";
import { AboutRoutingModule } from "../../about/about-routing-module";

@Component({
  selector: 'app-support-layout',
  imports: [SupportNav, AboutRoutingModule],
  templateUrl: './support-layout.html',
  styleUrl: './support-layout.css',
})
export class SupportLayout {}
