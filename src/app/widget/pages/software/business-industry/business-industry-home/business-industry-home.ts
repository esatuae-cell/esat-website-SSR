import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-industry-home',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './business-industry-home.html',
  styleUrl: './business-industry-home.css',
})
export class BusinessIndustryHome {
  // UI helper
  // get rows() {
  //   const size = 5;
  //   const result: any[] = [];

  //   for (let i = 0; i < this.solutions.length; i += size) {
  //     result.push(this.solutions.slice(i, i + size));
  //   }

  //   return result;
  // }

  solutions = [
    {
      title: 'Complete Management',
      iconType: 'class',
      icon: 'icon-ind-complete modIcon',
      image: 'assets/images/esat-project-solution-page-image.jpg',
      route: 'complete-mng',
    },
    {
      title: 'Facility Management',
      iconType: 'class',
      icon: 'icon-ind-facilituy modIcon',
      image: 'assets/images/crmimg.jpg',
      route: 'facility-mng',
    },
    {
      title: 'Real Estate Management',
      iconType: 'class',
      icon: 'icon-ind-realestate modIcon',
      image: 'assets/images/esat-realestate-solution-page-image.jpg',
      route: 'real-estate',
    },
    {
      title: 'Construction Management',
      iconType: 'class',
      icon: 'icon-ind-construction modIcon',
      image: 'assets/images/Construction.jpg',
      route: 'constrution-mng',
    },
    {
      title: 'Manufacturing Management',
      iconType: 'class',
      icon: 'icon-moduleicontask_icon modIcon',
      image: 'assets/images/esat-mng-solution-page-image.jpg',
      route: 'manufacturing-mng',
    },
    {
      title: 'Fleet Management',
      iconType: 'image',
      icon: 'assets/images/fleet.svg',
      image: 'assets/images/esat-fleet.jpg',
      route: 'fleet-mng',
    },
    {
      title: 'Shipment Management',
      iconType: 'image',
      icon: 'assets/images/shipment.svg',
      image: 'assets/images/esat-shipment.jpg',
      route: 'shipping',
    },
    {
      title: 'Retail & POS Management',
      iconType: 'image',
      icon: 'assets/images/retail.svg',
      image: 'assets/images/esat-retail.jpg',
      route: 'retail',
    },
    {
      title: 'Warehouse Management',
      iconType: 'image',
      icon: 'assets/images/warehouse.svg',
      image: 'assets/images/esat-warehouse.jpg',
      route: 'warehouse',
    },
    {
      title: 'CMMS Management',
      iconType: 'image',
      icon: 'assets/images/cmms.svg',
      image: 'assets/images/esat-cmms.jpg',
      route: 'cmms',
    },
  ];
}
