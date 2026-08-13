import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { RootServices } from '../../../../services/root-services';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News implements OnInit {
  public news: any[] = [];

  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  public $rootScope = inject(RootServices);

  ngOnInit(): void {
    // 1. Check existing shared state
    if (this.$rootScope.webData?.['news']) {
      this.news = this.$rootScope.webData['news'];
      return;
    }

    // 2. Fetch data (Angular automatically transfers HttpClient response during SSR)
    this.loadNews();
  }

  private loadNews(): void {
    this.http
      .get<any[]>('https://api.esat.ae/index1.php/wp-json/wp/v2/posts')
      .pipe(
        catchError((error) => {
          console.error('News API Error:', error);
          return of([]);
        }),
      )
      .subscribe((res) => {
        this.news = res;
      });
  }

  goToProductDetails(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/about/news-full', id]);
    }
  }
}
