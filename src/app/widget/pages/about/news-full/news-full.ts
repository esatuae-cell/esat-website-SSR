import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const newsId = history.state?.newsId;

    console.log('News ID:', newsId);

    if (!newsId) {
      this.loading = false;
      this.cdr.detectChanges();
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

          // Force UI update
          this.cdr.detectChanges();

          console.log('Loader finished');
        }),
      )
      .subscribe({
        next: (res) => {
          console.log('Full News Response:', res);

          this.news = [res];

          // Force Angular to render immediately
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('News API Error:', error);

          this.news = [];

          this.cdr.detectChanges();
        },
      });
  }
}
