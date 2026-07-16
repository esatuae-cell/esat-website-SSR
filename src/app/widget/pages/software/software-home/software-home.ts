import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';

import { RootServices } from '../../../../services/root-services';

@Component({
  selector: 'app-software-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './software-home.html',
  styleUrl: './software-home.css',
})
export class SoftwareHome implements OnInit {
  offset = 100;

  hwMainImage = 'assets/images/swhome.jpg';
  hwMainImage_low = 'assets/images/swhome_low.jpg';

  public queone = false;
  public quetwo = false;
  public quethree = false;
  public quefour = false;
  public quefive = false;
  public quesix = false;
  public quesaven = false;

  public slides: any[] = [];

  modalDescription: any;
  modalTitle: any;

  constructor(
    public $rootScope: RootServices,
    private http: HttpClient,
    private titleService: Title,
    private meta: Meta,
  ) {
    // Page Title
    this.titleService.setTitle('Best ERP Software - ESAT ERP Software in the Middle East');

    // Meta Description
    this.meta.updateTag({
      name: 'description',
      content:
        'We offer a broad range of ERP (Enterprise Resource Planning) including CRM (Customer Relationship Management), Finance Management, Asset Management, HRM (Human Resource Management), Payroll Management, Logistics Management, Real Estate Management and other software solutions.',
    });

    // Keywords
    this.meta.updateTag({
      name: 'keywords',
      content:
        'ERP Software UAE, ERP Software Middle East, ESAT ERP, CRM Software, Finance Management, HRM Software, Payroll Software, Asset Management, Logistics Management, Real Estate Management',
    });

    // Robots
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow',
    });

    // Open Graph
    this.meta.updateTag({
      property: 'og:title',
      content: 'Best ERP Software - ESAT ERP Software in the Middle East',
    });

    this.meta.updateTag({
      property: 'og:description',
      content:
        'We offer a broad range of ERP software including CRM, Finance, HRM, Payroll, Logistics, Asset Management, Real Estate Management and many other enterprise solutions.',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:url',
      content: 'https://www.esat.ae/software',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://www.esat.ae/assets/images/swhome.jpg',
    });

    // Twitter
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Best ERP Software - ESAT ERP Software in the Middle East',
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'Leading ERP software provider offering CRM, HRM, Finance, Payroll, Logistics and Real Estate Management solutions.',
    });

    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://www.esat.ae/assets/images/swhome.jpg',
    });
  }

  ngOnInit(): void {
    this.slides = [
      {
        name: 'Developing<br/><span>ERP Solutions</span>',
        thumblink: 'erp-solutions-serviceslider-1.jpg',
        thumblink_low: 'erp-solutions-serviceslider-1_low.jpg',
        link: 'swproduct',
      },
      {
        name: 'Application<br/><span>Development</span>',
        thumblink: 'gustas-brazaitis-541809-unsplash.jpg',
        thumblink_low: 'gustas-brazaitis-541809-unsplash_low.jpg',
        link: 'swservice/ser1',
      },
      {
        name: 'Software<br/><span>Development</span>',
        thumblink: 'charles-deluvio-456501-unsplash.jpg',
        thumblink_low: 'charles-deluvio-456501-unsplash_low.jpg',
        link: 'swservice/ser1',
      },
      {
        name: 'Software<br/><span>Consulting</span>',
        thumblink: 'Chart-Kopie-2-e1464803919955.jpg',
        thumblink_low: 'Chart-Kopie-2-e1464803919955_low.jpg',
        link: 'swservice/ser2',
      },
      {
        name: 'Software Support<br/><span>and Maintenance</span>',
        thumblink: 'softwaresolutions-banners.jpg',
        thumblink_low: 'softwaresolutions-banners_low.jpg',
        link: 'swservice/ser3',
      },
    ];
  }

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa fa-angle-right"></i></button>',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow:
            '<button class="slide-arrow prev-arrow"><i class="fa fa-angle-left"></i></button>',
          nextArrow:
            '<button class="slide-arrow next-arrow"><i class="fa fa-angle-right"></i></button>',
        },
        lazyLoad: 'ondemand',
      },
    ],
  };

  openModal(type: string): void {
    switch (type) {
      case 'roi':
        this.modalTitle = 'ESAT ERP – One Page ROI Calculator';
        this.modalDescription = `
<h6>Annual Savings Estimated:</h6>
<ul>
<li>Material Waste Reduction: AED 1,200,000</li>
<li>Labor Optimization: AED 560,000</li>
<li>Faster Billing & Cash Flow Improvement: AED 200,000</li>
<li>Machinery Cost Optimization: AED 150,000</li>
<li>Admin Workforce Reduction: AED 300,000</li>
</ul>

<p><b>Total Estimated Annual Savings: AED 2,410,000 – 3,000,000</b></p>

<p><b>Cost of ESAT ERP (Typical)</b>: AED 250,000 / year</p>

<h6>ROI Formula:</h6>
<p>ROI = (Annual Savings – Cost) / Cost</p>

<h6>Example:</h6>
<p>(2,410,000 – 250,000) / 250,000 = <b>864% ROI</b></p>

<h6>Meaning:</h6>
<p>For every AED 1 spent on ESAT ERP, the company gains AED 8–10 in savings.</p>
        `;
        break;
    }
  }
}
