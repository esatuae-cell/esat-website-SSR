import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-yut-hone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yut-hone.html',
  styleUrl: './yut-hone.css',
})
export class YutHone implements AfterViewInit {
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  openVideo(videoId: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`,
    );
  }

  closeVideo() {
    this.videoUrl = '';
  }

  ngAfterViewInit() {
    const modal = document.getElementById('exampleModalCenter');

    modal?.addEventListener('hidden.bs.modal', () => {
      this.closeVideo();
    });
  }
}