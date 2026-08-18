import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-news-full',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-full.html',
  styleUrl: './news-full.css',
})
export class NewsFull implements OnInit {
  public news: any[] = [];
  public loading = true;

  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit(): void {
    const newsId = history.state?.newsId;

    console.log('News ID:', newsId);

    if (!newsId) {
      this.loading = false;
      return;
    }

    this.loadNews(newsId);
  }

  private loadNews(id: number): void {
    const apiUrl = `https://api.esat.ae/index1.php/wp-json/wp/v2/posts/${id}`;

    console.log('Loading:', apiUrl);

    this.http
      .get<any>(apiUrl)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (res) => {
          console.log('Full News Response:', res);

          this.news = [res];
        },

        error: (error) => {
          console.error('News API Error:', error);

          this.news = [];
        },
      });
  }
}
