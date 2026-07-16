import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-training-home',
  imports: [ RouterLink],
  templateUrl: './training-home.html',
  styleUrl: './training-home.css',
})
export class TrainingHome {



 // UI helper
  get rows() {
    const size = 7;
    const result: any[] = [];

    for (let i = 0; i < this.solutions.length; i += size) {
      result.push(this.solutions.slice(i, i + size));
    }

    return result;
  }

 solutions = [
    { title: 'Fixed Asset Management', image: 'assets/images/assert.jpg', route: 'asset-training' },
    { title: 'Customer Relationship Management', image: 'assets/images/crmimg.jpg', route: 'crm-training' },
    { title: 'Facility & Service Management',      image: 'assets/images/facility.jpg', route: 'facility-training',    },
    { title: 'Finance & Accounts Management',      image: 'assets/images/finance.jpg',route: 'finance-training',    },
    { title: 'Human Capital Management', image: 'assets/images/hcm.jpg', route: 'hcm-training' },
    { title: 'Human Resource Management', image: 'assets/images/hrm.jpg', route: 'hrm-training' },
    { title: 'Contract Management', image: 'assets/images/contract.jpg', route: 'contract-training' },
    { title: 'Inventory Management', image: 'assets/images/esat-logistic-solution-page-image.jpg', route: 'inventory-training' },
    { title: 'Procurement Management',      image: 'assets/images/esat-procurement-solution-page-image.jpg',      route: 'procurement-training',    },
    { title: 'Budget & Project Management', image: 'assets/images/esat-project-solution-page-image.jpg', route: 'budget-training' },
    {title: 'Real Estate Management',      image: 'assets/images/esat-realestate-solution-page-image.jpg',      route: 'real-estate-training',    },
    { title: 'Sales Management', image: 'assets/images/esat-sales-solution-page-image.jpg', route: 'sales-training' },
    { title: 'Payroll Management', image: 'assets/images/esat-payroll.png', route: 'payroll-training' },
    { title: 'Manufacturing Management',      image: 'assets/images/esat-mng-solution-page-image.jpg',      route: 'manufacturing-training',    },
    { title: 'Organization Development', image: 'assets/images/esat-od-solution-page-image.jpg', route: 'organization-training' },
    { title: 'Retail & POS Management', image: 'assets/images/esat-retail.jpg', route: 'retail-training' },
    { title: 'Warehouse Management', image: 'assets/images/esat-warehouse.jpg', route: 'warehouse-training' },
    { title: 'Fleet Management', image: 'assets/images/esat-fleet.jpg', route: 'fleet-training' },
    { title: 'CMMS Management', image: 'assets/images/esat-cmms.jpg', route: 'cmms-training' },
    { title: 'Shipment Management', image: 'assets/images/esat-shipment.jpg', route: 'shipment-training' },
    { title: 'Quality Management', image: 'assets/images/esat-quality.jpg', route: 'quality-training' },
  ];
}
