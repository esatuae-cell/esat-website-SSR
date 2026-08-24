import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
    if (isPlatformBrowser(this.platformId)) {
      const newsReloaded = sessionStorage.getItem('newsReloaded');

      if (!newsReloaded) {
        sessionStorage.setItem('newsReloaded', 'true');
        window.location.reload();
        return;
      }

      // Remove the flag after the reload
      sessionStorage.removeItem('newsReloaded');
    }

    // Your existing code
    if (this.$rootScope.webData?.['news']) {
      this.news = this.$rootScope.webData['news'];
      return;
    }

    this.loadNews();
  }

  private loadNews(): void {
    const apiUrl = 'https://api.esat.ae/index1.php/wp-json/wp/v2/posts';

    this.http
      .get<any[]>(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('News API Error:', error);
          return of([]);
        }),
      )
      .subscribe((res) => {
        console.log('News List:', res);
        this.news = res;
      });
  }

  goToProductDetails(id: number): void {
    this.router.navigate(['/about/news-full'], {
      state: { newsId: id },
    });
  }
}
