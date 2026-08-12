import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { RootServices } from '../../../../services/root-services';
import { SchemaService } from '../../../../seo/schema.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-main',
  standalone: true,
  templateUrl: './about-main.html',
  styleUrl: './about-main.css',
  imports: [RouterLink],
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
    this.titleService.setTitle('Best Software Development Company in UAE | ESAT');

    // Meta Description
    this.meta.updateTag({
      name: 'description',
      content:
        'ESAT, a software development company in UAE, delivering ERP and business solutions for modern companies.',
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

    // Twitter Card
  }
}
