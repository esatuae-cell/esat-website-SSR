import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-business-industry-home',
  imports: [ RouterLink],
  templateUrl: './business-industry-home.html',
  styleUrl: './business-industry-home.css',
})
export class BusinessIndustryHome {


 // UI helper
  get rows() {
    const size = 5;
    const result: any[] = [];

    for (let i = 0; i < this.solutions.length; i += size) {
      result.push(this.solutions.slice(i, i + size));
    }

    return result;
  }

  solutions = [
    { title: 'Complete Management', image: 'assets/images/esat-project-solution-page-image.jpg', route: 'complete-mng' },
    { title: 'Facility Management', image: 'assets/images/crmimg.jpg', route: 'facility-mng' },
    { title: 'Real Estate Management',      image: 'assets/images/esat-realestate-solution-page-image.jpg',      route: 'real-estate',    },
    { title: 'Construction Management',      image: 'assets/images/Construction.jpg',      route: 'constrution-mng',    },
    { title: 'Manufacturing Management', image: 'assets/images/esat-mng-solution-page-image.jpg', route: 'manufacturing-mng' },
    { title: 'Fleet Management', image: 'assets/images/esat-fleet.jpg', route: 'fleet-mng' },
    { title: 'Shipment Management', image: 'assets/images/esat-shipment.jpg', route: 'shipping' },
    { title: 'Retail & POS Management', image: 'assets/images/esat-retail.jpg', route: 'retail' },
    { title: 'Warehouse Management',      image: 'assets/images/esat-warehouse.jpg',      route: 'warehouse',},
    { title: 'CMMS Management', image: 'assets/images/esat-cmms.jpg', route: 'cmms' },
   
    
  ];
}
