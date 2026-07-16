import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/core';

import { RootServices } from '../../../../services/root-services';

const NEWS_KEY = makeStateKey<any[]>('news-data');

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News implements OnInit {
  public news: any[] = [];

  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    private router: Router,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    // 1. Use existing RootServices data
    if (
      this.$rootScope.webData &&
      Object.keys(this.$rootScope.webData).length > 0 &&
      this.$rootScope.webData['news']
    ) {
      this.news = this.$rootScope.webData['news'];
      return;
    }

    // 2. Browser: use TransferState if available
    if (this.transferState.hasKey(NEWS_KEY)) {
      this.news = this.transferState.get(NEWS_KEY, []);
      this.transferState.remove(NEWS_KEY);
      return;
    }

    // 3. Server fetches data once
    this.loadNews();
  }

  private loadNews(): void {
    this.http
      .get<any[]>('https://esat.ae/index1.php/wp-json/wp/v2/posts')
      .pipe(
        catchError((error) => {
          console.error('News API Error:', error);
          return of([]);
        }),
      )
      .subscribe((res) => {
        this.news = res;

        // Save for browser hydration
        this.transferState.set(NEWS_KEY, res);
      });
  }

  goToProductDetails(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/about/news-full', id]);
    }
  }
}
