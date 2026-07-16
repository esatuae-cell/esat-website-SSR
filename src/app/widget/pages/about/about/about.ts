import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  constructor(private router: Router) {}

  @Input() isHome = false;
}
