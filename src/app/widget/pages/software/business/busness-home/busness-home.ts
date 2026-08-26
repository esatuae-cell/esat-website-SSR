import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-busness-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './busness-home.html',
  styleUrl: './busness-home.css',
})
export class BusnessHome {
  // UI helper

  solutions = [
    {
      title: 'Fixed Asset Management',
      iconType: 'class',
      icon: 'icon-moduleiconassets_icon modIcon',
      image: 'assets/images/assert.jpg',
      route: 'asset-management',
    },
    {
      title: 'Customer Relationship Management',
      iconType: 'class',
      icon: 'icon-moduleiconcrm_icon modIcon',
      image: 'assets/images/crmimg.jpg',
      route: 'crm',
    },
    {
      title: 'Facility & Service Management',
      iconType: 'class',
      icon: 'icon-moduleiconfacilitymanagement_icon modIcon',
      image: 'assets/images/facility.jpg',
      route: 'facility',
    },
    {
      title: 'Finance & Accounts Management',
      iconType: 'class',
      icon: 'icon-moduleiconfinancemanagement modIcon',
      image: 'assets/images/finance.jpg',
      route: 'finance-management',
    },
    {
      title: 'Human Capital Management',
      iconType: 'class',
      icon: 'icon-moduleiconhcm_icon modIcon',
      image: 'assets/images/hcm.jpg',
      route: 'hcm',
    },
    {
      title: 'Human Resource Management',
      iconType: 'class',
      icon: 'icon-moduleiconhrm_icon modIcon',
      image: 'assets/images/hrm.jpg',
      route: 'hrm',
    },
    {
      title: 'Contract Management',
      iconType: 'class',
      icon: 'icon-moduleiconcont_icon modIcon',
      image: 'assets/images/contract.jpg',
      route: 'contract-management',
    },
    {
      title: 'Inventory Management',
      iconType: 'class',
      icon: 'icon-moduleiconlogistic_icon modIcon',
      image: 'assets/images/esat-logistic-solution-page-image.jpg',
      route: 'Inventory',
    },
    {
      title: 'Procurement Management',
      iconType: 'class',
      icon: 'icon-moduleiconprocurement_icon modIcon',
      image: 'assets/images/esat-procurement-solution-page-image.jpg',
      route: 'procurement',
    },
    {
      title: 'Budget & Project Management',
      iconType: 'class',
      icon: 'icon-icon-project modIcon',
      image: 'assets/images/esat-project-solution-page-image.jpg',
      route: 'budject-management',
    },
    {
      title: 'Real Estate Management',
      iconType: 'class',
      icon: 'icon-moduleiconrealestate_icon modIcon',
      image: 'assets/images/esat-realestate-solution-page-image.jpg',
      route: 'real-estate',
    },
    {
      title: 'Sales Management',
      iconType: 'class',
      icon: 'icon-font-20 modIcon',
      image: 'assets/images/esat-sales-solution-page-image.jpg',
      route: 'sales',
    },
    {
      title: 'Payroll Management',
      iconType: 'class',
      icon: 'icon-moduleicon_payrollicon modIcon',
      image: 'assets/images/esat-payroll.png',
      route: 'payroll',
    },
    {
      title: 'Manufacturing Management',
      iconType: 'class',
      icon: 'icon-moduleicontask_icon modIcon',
      image: 'assets/images/esat-mng-solution-page-image.jpg',
      route: 'manufacturing',
    },
    {
      title: 'Organization Development',
      iconType: 'class',
      icon: 'icon-odesatodmodicon modIcon',
      image: 'assets/images/esat-od-solution-page-image.jpg',
      route: 'organization',
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
      title: 'Fleet Management',
      iconType: 'image',
      icon: 'assets/images/fleet.svg',
      image: 'assets/images/esat-fleet.jpg',
      route: 'fleet-management',
    },
    {
      title: 'CMMS Management',
      iconType: 'image',
      icon: 'assets/images/cmms.svg',
      image: 'assets/images/esat-cmms.jpg',
      route: 'cmms',
    },
    {
      title: 'Shipment Management',
      iconType: 'image',
      icon: 'assets/images/shipment.svg',
      image: 'assets/images/esat-shipment.jpg',
      route: 'shipmemt',
    },
    {
      title: 'Quality Management',
      iconType: 'image',
      icon: 'assets/images/quality.svg',
      image: 'assets/images/esat-quality.jpg',
      route: 'quality',
    },

    {
      title: 'Catering Management',
      iconType: 'image',
      icon: 'assets/images/catoring_white.svg',
      image: 'assets/images/catoring.jpg',
      route: 'catering',
    },
  ];

  solutionRows = [
    this.solutions.slice(0, 6), // 1st row: 6
    this.solutions.slice(6, 11), // 2nd row: 5
    this.solutions.slice(11, 17), // 3rd row: 6
    this.solutions.slice(17, 22), // 4th row: 5
  ];
}
