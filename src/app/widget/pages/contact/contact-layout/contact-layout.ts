import { Component } from '@angular/core';
import { ContactSubMenu } from "../contact-sub-menu/contact-sub-menu";
import { AboutRoutingModule } from "../../about/about-routing-module";

@Component({
  selector: 'app-contact-layout',
  imports: [ContactSubMenu, AboutRoutingModule],
  templateUrl: './contact-layout.html',
  styleUrl: './contact-layout.css',
})
export class ContactLayout {}
