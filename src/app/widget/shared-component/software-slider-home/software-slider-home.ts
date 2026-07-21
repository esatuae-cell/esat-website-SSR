import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-software-slider-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './software-slider-home.html',
  styleUrls: ['./software-slider-home.css']
})
export class SoftwareSliderHome implements OnInit, OnDestroy {

  activeIndex = 0;
  interval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  items = [
    {
      title: 'Software Consulting',
      description: 'Relying on our domain and development experience, we can support you to ﬁll the gaps between data, ideas and results...',
      image: 'assets/images/portfolio/1.jpg',
      link: '/software/software-services'
    },
    {
      title: 'Application Development',
      description: 'These services are related to customization of application design and development. We combine technology expertise ...',
      image: 'assets/images/portfolio/2.jpg',
      link: '/software/software-services'
    },
    {
      title: 'Software Development',
      description: 'These services are related to customization of application design and development. We combine technology expertise...',
      image: 'assets/images/portfolio/3.jpg',
      link: '/software/software-services'
    },
    {
      title: 'ERP Solutions',
      description: 'ESAT-ERP has developed optimal solutions tailored to your business’ needs regardless of its type, size  and the industry...',
      image: 'assets/images/portfolio/4.jpg',
      link: '/software/swprodcont-erp'
    },
    {
      title: 'Support & Maintenance',
      description: 'ESAT aims to preserve the value and worth of the software as time goes by. Having this in mind, our support service...',
      image: 'assets/images/portfolio/5.jpg',
      link: '/software/software-services'
    },
    {
      title: 'Software Development',
      description: 'These services are related to customization of application design and development. We combine technology expertise...',
      image: 'assets/images/portfolio/3.jpg',
      link: '/software/software-services'
    },
    {
      title: 'Application Development',
      description: 'These services are related to customization of application design and development. We combine technology expertise ...',
      image: 'assets/images/portfolio/2.jpg',
      link: '/software/software-services'
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }

  prev() {
    this.activeIndex =
      (this.activeIndex - 1 + this.items.length) % this.items.length;
  }

  startAutoPlay() {
    this.interval = setInterval(() => {
      this.next();
    }, 3500);
  }

  getStyle(i: number) {

  const total = this.items.length;

  let offset = i - this.activeIndex;

  // Circular correction
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const abs = Math.abs(offset);

  // Tighter spacing
  const baseGap = 55;
  const translateX = offset * baseGap;

  const rotateY = offset * -8;

  let scale = 1;
  let opacity = 1;
  let zIndex = 1000;
  let blur = 0;

  // Active slide
  if (abs === 0) {
    scale = 1;
    opacity = 1;
    zIndex = 9999;
    blur = 0;
  }

  // First side layer
  else if (abs === 1) {
    scale = 0.75;
    opacity = 0.7;
    zIndex = 500;
    blur = 0;
  }

  // Second side layer
  else if (abs === 2) {
    scale = 0.58;
    opacity = 0.45;
    zIndex = 250;
    blur = 1;
  }

  // Third side layer
  else if (abs === 3) {
    scale = 0.45;
    opacity = 0.2;
    zIndex = 100;
    blur = 2;
  }

  // Hidden
  else {
    scale = 0.35;
    opacity = 0;
    zIndex = 0;
    blur = 3;
  }

  return {
    position: 'absolute',
    left: '50%',
    top: '0',
    transform: `
      translateX(calc(-50% + ${translateX}px))
      scale(${scale})
      rotateY(${rotateY}deg)
    `,
    opacity,
    zIndex,
    filter: `blur(${blur}px)`,
    transition: 'all 0.7s ease'
  };
}
}