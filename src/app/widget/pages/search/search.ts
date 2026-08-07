import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.initGoogleSearch();
  }

  private initGoogleSearch(): void {
    const w = window as any;

    /*
     * Google requires this to be defined BEFORE
     * cse.js is loaded when using explicit rendering.
     */
    w.__gcse = w.__gcse || {};

    w.__gcse.parsetags = 'explicit';

    w.__gcse.initializationCallback = () => {
      setTimeout(() => {
        const google = w.google;

        if (!google || !google.search || !google.search.cse || !google.search.cse.element) {
          console.error('Google CSE API is not available.');
          return;
        }

        const container = document.getElementById('google-search');

        if (!container) {
          console.error('Google search container not found.');
          return;
        }

        // Prevent duplicate rendering
        container.innerHTML = '';

        google.search.cse.element.render({
          div: 'google-search',
          tag: 'search',
        });
      }, 0);
    };

    /*
     * Check if Google CSE script already exists.
     */
    const existingScript = document.querySelector(
      'script[src*="cse.google.com/cse.js"]',
    ) as HTMLScriptElement | null;

    if (existingScript) {
      /*
       * If the script was already loaded before this component
       * initialized, Google may already be available.
       */
      if (w.google?.search?.cse?.element) {
        setTimeout(() => {
          const container = document.getElementById('google-search');

          if (!container) {
            return;
          }

          container.innerHTML = '';

          w.google.search.cse.element.render({
            div: 'google-search',
            tag: 'search',
          });
        }, 100);
      }

      return;
    }

    /*
     * Load Google CSE.
     */
    const script = document.createElement('script');

    script.src = 'https://cse.google.com/cse.js?cx=92a7d0d291fd04fa1';

    script.async = true;

    document.head.appendChild(script);
  }
}
