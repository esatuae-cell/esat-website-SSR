import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { HardwareSubSndMenu } from '../hardware-sub-snd-menu/hardware-sub-snd-menu';
import { HardwareSubMenu } from '../hardware-sub-menu/hardware-sub-menu';
import { SchemaService } from '../../../../seo/schema.service';

@Component({
  selector: 'app-it-hardware',
  standalone: true,
  imports: [HardwareSubSndMenu, HardwareSubMenu],
  templateUrl: './it-hardware.html',
  styleUrl: './it-hardware.css',
})
export class ItHardware implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    // Page Title
    this.titleService.setTitle('IT Hardware Solutions UAE | Servers, Storage & Networking | ESAT');

    // Meta Tags
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'ESAT provides enterprise IT hardware solutions including servers, storage, networking, security, data center infrastructure, laptops, desktops and IT support services across UAE.',
      },

      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://esat.ae/hardware' },
      { property: 'og:site_name', content: 'ESAT' },
      {
        property: 'og:title',
        content: 'IT Hardware Solutions UAE | Servers, Storage & Networking | ESAT',
      },
      {
        property: 'og:description',
        content:
          'Enterprise IT hardware solutions including servers, networking, storage and security solutions for businesses in UAE.',
      },
      {
        property: 'og:image',
        content: 'https://esat.ae/assets/images/og-hardware.jpg',
      },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@EsatSocial' },
      {
        name: 'twitter:title',
        content: 'IT Hardware Solutions UAE | Servers, Storage & Networking | ESAT',
      },
      {
        name: 'twitter:description',
        content:
          'Complete IT hardware, networking, servers and enterprise infrastructure solutions across UAE.',
      },
      {
        name: 'twitter:image',
        content: 'https://esat.ae/assets/images/og-hardware.jpg',
      },
    ]);

    // Canonical URL
    this.setCanonicalURL('https://esat.ae/hardware');
  }

  private setCanonicalURL(url: string): void {
    let link: HTMLLinkElement =
      this.document.querySelector('link[rel="canonical"]') || this.document.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);

    this.document.head.appendChild(link);

    this.addJsonLd();

    this.schemaService.addSchema({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'IT Hardware Solutions UAE',
      url: 'https://esat.ae/hardware',
      provider: {
        '@type': 'Organization',
        name: 'ESAT',
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      description:
        'Enterprise IT hardware solutions including servers, networking, storage and security infrastructure.',
      serviceType: 'IT Hardware Solutions',
    });
  }

  private addJsonLd(): void {
    const script = this.renderer.createElement('script');

    script.type = 'application/ld+json';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'IT Hardware Solutions UAE',
      url: 'https://esat.ae/hardware',
      provider: {
        '@type': 'Organization',
        name: 'ESAT',
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      description:
        'Enterprise IT hardware solutions including servers, networking, storage and security infrastructure.',
      serviceType: 'IT Hardware Solutions',
    });

    this.renderer.appendChild(this.document.head, script);
  }
}
