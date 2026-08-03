import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-yut-hone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yut-hone.html',
  styleUrl: './yut-hone.css',
})
export class YutHone implements AfterViewInit, OnDestroy {
  videoUrl: SafeResourceUrl | null = null;

  @ViewChild('youtubePlayer')
  youtubePlayer!: ElementRef<HTMLIFrameElement>;

  private modal: HTMLElement | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  openVideo(videoId: string) {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    // Give Angular time to update iframe
    setTimeout(() => {
      if (this.youtubePlayer) {
        this.youtubePlayer.nativeElement.src = url;
      }
    }, 100);
  }

  closeVideo() {
    // Completely stop YouTube
    if (this.youtubePlayer) {
      this.youtubePlayer.nativeElement.src = 'about:blank';
    }

    this.videoUrl = null;
  }

  ngAfterViewInit() {
    this.modal = document.getElementById('exampleModalCenter');

    this.modal?.addEventListener('hidden.bs.modal', () => {
      this.closeVideo();
    });
  }

  ngOnDestroy() {
    this.closeVideo();
  }
}
