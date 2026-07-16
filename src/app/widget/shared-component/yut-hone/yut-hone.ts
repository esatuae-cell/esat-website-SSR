import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



interface Video {
  id: string;
  thumbnail: string;
  alt: string;
  url: string;
}




@Component({
 selector: 'app-yut-hone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yut-hone.html',
  styleUrl: './yut-hone.css',
})


export class YutHone {



videos: Video[] = [
    { 
      id: 'video1',
      thumbnail: '/assets/images/thumpnil-who.jpg', 
      alt: 'Who we are video thumbnail',
      url: 'https://www.youtube.com/embed/dqcvlbsUw_4?si=qzwaTsVQ1cNJ6RFt'
    },
    { 
      id: 'video2',
      thumbnail: '/assets/images/fearure-Video_thumb.jpg', 
      alt: 'Feature video thumbnail',
      url: 'https://www.youtube.com/embed/ty1OV0Tzckw?si=nTmhcfKixZ3RPTKm'
    },
    { 
      id: 'video3',
      thumbnail: '/assets/images/Video_thumb.png', 
      alt: 'Video thumbnail',
      url: 'https://www.youtube.com/embed/5noD9fEtp_0?si=Cf148rrXRK00o7Lv'
    },
    { 
      id: 'video4',
      thumbnail: '/assets/images/property-management-thumpnil.jpg', 
      alt: 'Property management video thumbnail',
      url: 'https://www.youtube.com/embed/0TC-A1eQ5U0?si=xkMzam-QSC8zWCg-'
    },
    { 
      id: 'video5',
      thumbnail: '/assets/images/Realestate_management_thumpnille.jpg', 
      alt: 'Property management video thumbnail',
      url: 'https://www.youtube.com/embed/fHUDrxfZL58?si=0Z57a7M1Fcb6zsJU'
    }
    // Add more videos here if needed
  ];

  // Properties to manage carousel state
  displayedVideos: Video[] = [];
  currentIndex = 0;
  itemsPerPage = 5;

  // Properties for the modal
  showModal = false;
  videoUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Initialize the carousel by displaying the first set of videos
    this.updateDisplayedVideos();
  }

  // Carousel navigation methods
  nextSlide(): void {
    if (this.currentIndex + this.itemsPerPage < this.videos.length) {
      this.currentIndex++;
      this.updateDisplayedVideos();
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateDisplayedVideos();
    }
  }

  // Helper method to update the videos displayed in the template
  updateDisplayedVideos(): void {
    this.displayedVideos = this.videos.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  // Modal methods (from your original code)
  openModal(videoId: string): void {
    const selectedVideo = this.videos.find(video => video.id === videoId);
    if (selectedVideo) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(selectedVideo.url);
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.videoUrl = ''; 
  }


   youtubeMain() {
    window.open('https://www.youtube.com/@EsatSolution/videos', '_blank');
  }
}