import { Component, OnInit, Renderer2, Inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';
import { SwCommon } from '../sw-common/sw-common';

import 'aos/dist/aos.css';
import { SchemaService } from '../../../../seo/schema.service';

@Component({
  selector: 'app-secure-erp',
  standalone: true,
  imports: [SwCommon],
  templateUrl: './secure-erp.html',
  styleUrls: ['./secure-erp.css'],
})
export class SecureErp implements OnInit {
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    // =========================
    // SEO TITLE
    // =========================

    this.titleService.setTitle('Secure ERP Software UAE | Cloud ERP Solution | ESAT ERP');

    // =========================
    // META DESCRIPTION
    // =========================

    this.metaService.updateTag({
      name: 'description',

      content:
        'ESAT Secure ERP is a powerful cloud ERP software solution in UAE designed to protect business transactions, automate operations and manage finance, HR, inventory, CRM, manufacturing and business processes.',
    });

    // =========================
    // KEYWORDS
    // =========================

    this.metaService.updateTag({
      name: 'keywords',

      content:
        'Secure ERP UAE, Cloud ERP Software UAE, ERP Solution Dubai, Business Management Software UAE, ESAT ERP, Enterprise ERP System',
    });

    // =========================
    // OPEN GRAPH
    // =========================

    this.metaService.updateTag({
      property: 'og:type',

      content: 'website',
    });

    this.metaService.updateTag({
      property: 'og:url',

      content: 'https://esat.ae/software/secure-erp',
    });

    this.metaService.updateTag({
      property: 'og:site_name',

      content: 'ESAT',
    });

    this.metaService.updateTag({
      property: 'og:title',

      content: 'Secure ERP Software UAE | Cloud ERP Solution | ESAT ERP',
    });

    this.metaService.updateTag({
      property: 'og:description',

      content:
        'Secure cloud ERP platform helping UAE companies manage finance, HR, inventory, CRM, manufacturing and complete business operations.',
    });

    this.metaService.updateTag({
      property: 'og:image',

      content: 'https://esat.ae/assets/images/secure-erp.jpg',
    });

    // =========================
    // TWITTER
    // =========================

    this.metaService.updateTag({
      name: 'twitter:card',

      content: 'summary_large_image',
    });

    this.metaService.updateTag({
      name: 'twitter:title',

      content: 'Secure ERP Software UAE | Cloud ERP Solution | ESAT ERP',
    });

    this.metaService.updateTag({
      name: 'twitter:description',

      content:
        'Secure ERP solution for UAE businesses with integrated finance, HR, inventory, CRM and operational management.',
    });

    this.metaService.updateTag({
      name: 'twitter:image',

      content: 'https://esat.ae/assets/images/secure-erp.jpg',
    });

    // =========================
    // CANONICAL URL
    // =========================

    this.setCanonicalURL('https://esat.ae/software/secure-erp');

    // =========================
    // SCHEMA
    // =========================

    this.addJsonLd();
  }

  setCanonicalURL(url: string): void {
    let link: HTMLLinkElement =
      this.document.querySelector("link[rel='canonical']") || this.document.createElement('link');

    link.setAttribute('rel', 'canonical');

    link.setAttribute('href', url);

    this.document.head.appendChild(link);
  }

  addJsonLd(): void {
    const script = this.renderer.createElement('script');

    script.type = 'application/ld+json';

    script.text = JSON.stringify({
      '@context': 'https://schema.org',

      '@type': 'SoftwareApplication',

      name: 'ESAT Secure ERP',

      url: 'https://esat.ae/software/secure-erp',

      applicationCategory: 'BusinessApplication',

      operatingSystem: 'Cloud',

      description:
        'Secure ERP software solution for UAE businesses managing finance, HR, inventory, CRM, manufacturing and business operations.',

      provider: {
        '@type': 'Organization',

        name: 'ESAT',
      },
    });

    this.renderer.appendChild(
      this.document.head,

      script,
    );
  }

  setVideo(url: string): void {
    const autoplayUrl = `${url}?autoplay=1&mute=1&rel=0&enablejsapi=1`;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(autoplayUrl);
  }

  clearVideo(): void {
    this.videoUrl = null;
  }
}
