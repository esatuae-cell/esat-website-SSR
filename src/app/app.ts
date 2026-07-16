import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Footer } from '../app/widget/common/footer/footer';
import { Header } from '../app/widget/common/header/header';
import { routes } from './app.routes';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { isPlatformBrowser } from '@angular/common';

export const appRoutes = routes;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  showAboutMenu = false;

  protected readonly title = signal('ESATWEBSITE');

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    // ✅ RUN ONLY IN BROWSER
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
      });

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            AOS.refresh();
          }, 200);
        }
      });
    }
  }
}
