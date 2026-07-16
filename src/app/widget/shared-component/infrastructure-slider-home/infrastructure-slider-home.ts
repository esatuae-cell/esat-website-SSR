import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-infrastructure-slider-home',
   standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './infrastructure-slider-home.html',
  styleUrl: './infrastructure-slider-home.css',
})
export class InfrastructureSliderHome implements OnInit, OnDestroy{

 activeIndex = 0;
  interval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  items = [
    {
      title: 'ELV Solutions',
      description: 'ESAT ELV technology solutions aim to improve your business or organizational quality of life (QoL) standards in the most cost-effective way....',
      image: 'assets/images/portfolio/6.jpg',
      link: '/software/swservice'
    },
    {
      title: 'IT Consulting',
      description: 'With ESAT IT Consulting Services, you will get the latest software and optimized updates to make sure you have the information technology resources ...',
      image: 'assets/images/portfolio/7.jpg',
      link: '/software/swservice'
    },
    {
      title: 'IT Hardware and Networking',
      description: 'ESAT is your one-stop shop for hardware. Our service and multi-product offerings remove the weight of dealing with multiple vendors ...',
      image: 'assets/images/portfolio/8.jpg',
      link: '/software/swservice'
    },
    {
      title: 'Audio Visual Systems',
      description: 'Integrate our AV Technology into your Physical Infrastructure. Presentations, video conferences, group collaborations ...',
      image: 'assets/images/portfolio/11.jpg',
      link: '/software/swprodcont-erp'
    },
    {
      title: 'Physical Surveillance Security',
      description: 'Whether it is a home, a small store or a business infrastructure worth millions of dollars, efﬁcient security measures are necessary to achieve ....',
      image: 'assets/images/portfolio/9.jpg',
      link: '/software/swservice'
    },

     {
      title: 'Security Audit',
      description: 'The ultimate security for an enterprise. We use targeted approach to find & eliminate all the security threats. ESAT approach is focused on eliminating....',
      image: 'assets/images/portfolio/10.jpg',
      link: '/software/swservice'
    },
     {
      title: 'Audio Visual Systems',
      description: 'Integrate our AV Technology into your Physical Infrastructure. Presentations, video conferences, group collaborations, and work areas....',
      image: 'assets/images/portfolio/11.jpg',
      link: '/software/swservice'
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