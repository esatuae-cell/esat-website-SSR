import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-training-home',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './training-home.html',
  styleUrl: './training-home.css',
})
export class TrainingHome {
  // UI helper
  // get rows() {
  //   const size = 7;
  //   const result: any[] = [];

  //   for (let i = 0; i < this.solutions.length; i += size) {
  //     result.push(this.solutions.slice(i, i + size));
  //   }

  //   return result;
  // }

  solutions = [
    {
      title: 'Fixed Asset Management',
      iconType: 'class',
      icon: 'icon-moduleiconassets_icon modIcon',
      image: 'assets/images/assert.jpg',
      route: 'asset-training',
    },
    {
      title: 'Customer Relationship Management',
      iconType: 'class',
      icon: 'icon-moduleiconcrm_icon modIcon',
      image: 'assets/images/crmimg.jpg',
      route: 'crm-training',
    },
    {
      title: 'Facility & Service Management',
      iconType: 'class',
      icon: 'icon-moduleiconfacilitymanagement_icon modIcon',
      image: 'assets/images/facility.jpg',
      route: 'facility-training',
    },
    {
      title: 'Finance & Accounts Management',
      iconType: 'class',
      icon: 'icon-moduleiconfinancemanagement modIcon',
      image: 'assets/images/finance.jpg',
      route: 'finance-training',
    },
    {
      title: 'Human Capital Management',
      iconType: 'class',
      icon: 'icon-moduleiconhcm_icon modIcon',
      image: 'assets/images/hcm.jpg',
      route: 'hcm-training',
    },
    {
      title: 'Human Resource Management',
      iconType: 'class',
      icon: 'icon-moduleiconhrm_icon modIcon',
      image: 'assets/images/hrm.jpg',
      route: 'hrm-training',
    },
    {
      title: 'Contract Management',
      iconType: 'class',
      icon: 'icon-moduleiconcont_icon modIcon',
      image: 'assets/images/contract.jpg',
      route: 'contract-training',
    },
    {
      title: 'Inventory Management',
      iconType: 'class',
      icon: 'icon-moduleiconlogistic_icon modIcon',
      image: 'assets/images/esat-logistic-solution-page-image.jpg',
      route: 'inventory-training',
    },
    {
      title: 'Procurement Management',
      iconType: 'class',
      icon: 'icon-moduleiconprocurement_icon modIcon',
      image: 'assets/images/esat-procurement-solution-page-image.jpg',
      route: 'procurement-training',
    },
    {
      title: 'Budget & Project Management',
      iconType: 'class',
      icon: 'icon-icon-project modIcon',
      image: 'assets/images/esat-project-solution-page-image.jpg',
      route: 'budget-training',
    },
    {
      title: 'Real Estate Management',
      iconType: 'class',
      icon: 'icon-moduleiconrealestate_icon modIcon',
      image: 'assets/images/esat-realestate-solution-page-image.jpg',
      route: 'real-estate-training',
    },
    {
      title: 'Sales Management',
      iconType: 'class',
      icon: 'icon-font-20 modIcon',
      image: 'assets/images/esat-sales-solution-page-image.jpg',
      route: 'sales-training',
    },
    {
      title: 'Payroll Management',
      iconType: 'class',
      icon: 'icon-moduleicon_payrollicon modIcon',
      image: 'assets/images/esat-payroll.png',
      route: 'payroll-training',
    },
    {
      title: 'Manufacturing Management',
      iconType: 'class',
      icon: 'icon-moduleicontask_icon modIcon',
      image: 'assets/images/esat-mng-solution-page-image.jpg',
      route: 'manufacturing-training',
    },
    {
      title: 'Organization Development',
      iconType: 'class',
      icon: 'icon-odesatodmodicon modIcon',
      image: 'assets/images/esat-od-solution-page-image.jpg',
      route: 'organization-training',
    },
    {
      title: 'Retail & POS Management',
      iconType: 'image',
      icon: 'assets/images/retail.svg',
      image: 'assets/images/esat-retail.jpg',
      route: 'retail-training',
    },
    {
      title: 'Warehouse Management',
      iconType: 'image',
      icon: 'assets/images/warehouse.svg',
      image: 'assets/images/esat-warehouse.jpg',
      route: 'warehouse-training',
    },
    {
      title: 'Fleet Management',
      iconType: 'image',
      icon: 'assets/images/fleet.svg',
      image: 'assets/images/esat-fleet.jpg',
      route: 'fleet-training',
    },
    {
      title: 'CMMS Management',
      iconType: 'image',
      icon: 'assets/images/cmms.svg',
      image: 'assets/images/esat-cmms.jpg',
      route: 'cmms-training',
    },
    {
      title: 'Shipment Management',
      iconType: 'image',
      icon: 'assets/images/shipment.svg',
      image: 'assets/images/esat-shipment.jpg',
      route: 'shipment-training',
    },
    {
      title: 'Quality Management',
      iconType: 'image',
      icon: 'assets/images/quality.svg',
      image: 'assets/images/esat-quality.jpg',
      route: 'quality-training',
    },
  ];
}
