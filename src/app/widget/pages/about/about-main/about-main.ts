import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { RootServices } from '../../../../services/root-services';
import { SchemaService } from '../../../../seo/schema.service';

@Component({
  selector: 'app-about-main',
  standalone: true,
  templateUrl: './about-main.html',
  styleUrl: './about-main.css',
  imports: [],
})
export class AboutMain {
  constructor(
    private http: HttpClient,
    public $rootScope: RootServices,
    private titleService: Title,
    private meta: Meta,
    private schemaService: SchemaService,
  ) {
    this.setSeo();
  }

  private setSeo() {
    // Page Title
    this.titleService.setTitle('Best Software Development Company in UAE | ESAT');

    // Meta Description
    this.meta.updateTag({
      name: 'description',
      content:
        'ESAT is a leading software development company in UAE providing ERP, cloud solutions, and business automation software for modern enterprises.',
    });

    // Keywords
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Software Development Company UAE, ERP Software UAE, Business Automation Software, Cloud ERP UAE',
    });

    // Robots
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow',
    });

    // Open Graph for Facebook / LinkedIn
    this.meta.updateTag({
      property: 'og:title',
      content: 'Best Software Development Company in UAE | ESAT',
    });

    this.meta.updateTag({
      property: 'og:description',
      content: 'ESAT provides ERP and business automation solutions for companies in UAE.',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://yourdomain.com/assets/images/esat-og-image.jpg',
    });

    // Twitter Card
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Best Software Development Company in UAE | ESAT',
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: 'ERP and cloud business solutions from ESAT UAE.',
    });
  }
}
