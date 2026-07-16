import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-support-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './support-nav.html',
  styleUrl: './support-nav.css',
})
export class SupportNav {}
