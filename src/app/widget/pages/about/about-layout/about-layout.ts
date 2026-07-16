import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { About } from '../about/about';

@Component({
  selector: 'app-about-layout',
  standalone: true,
  imports: [About, RouterOutlet],
  templateUrl: './about-layout.html',
  styleUrls: ['./about-layout.css'],
})
export class AboutLayout {

  isAboutHome = false;

  constructor(private router: Router) {

    this.checkRoute();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  private checkRoute() {
    const url = this.router.url;

    this.isAboutHome =
      url === '/about' || url === '/about/';
  }
}