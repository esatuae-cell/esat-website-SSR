import { Component } from '@angular/core';
import { Router, RouterOutlet,RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-business-line-nav',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './business-line-nav.html',
  styleUrl: './business-line-nav.css',
})
export class BusinessLineNav {}



