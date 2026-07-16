import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busness-home',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './busness-home.html',
  styleUrl: './busness-home.css',
})
export class BusnessHome {
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
    { title: 'Fixed Asset Management', image: 'assets/images/assert.jpg', route: 'asset-management' },
    { title: 'Customer Relationship Management', image: 'assets/images/crmimg.jpg', route: 'crm' },
    { title: 'Facility & Service Management',      image: 'assets/images/facility.jpg', route: 'facility',    },
    { title: 'Finance & Accounts Management',      image: 'assets/images/finance.jpg',route: 'finance-management',    },
    { title: 'Human Capital Management', image: 'assets/images/hcm.jpg', route: 'hcm' },
    { title: 'Human Resource Management', image: 'assets/images/hrm.jpg', route: 'hrm' },
    { title: 'Contract Management', image: 'assets/images/contract.jpg', route: 'contract-management' },
    { title: 'Inventory Management', image: 'assets/images/esat-logistic-solution-page-image.jpg', route: 'Inventory' },
    { title: 'Procurement Management',      image: 'assets/images/esat-procurement-solution-page-image.jpg',      route: 'procurement',    },
    { title: 'Budget & Project Management', image: 'assets/images/esat-project-solution-page-image.jpg', route: 'budject-management' },
    {title: 'Real Estate Management',      image: 'assets/images/esat-realestate-solution-page-image.jpg',      route: 'real-estate',    },
    { title: 'Sales Management', image: 'assets/images/esat-sales-solution-page-image.jpg', route: 'sales' },
    { title: 'Payroll Management', image: 'assets/images/esat-payroll.png', route: 'payroll' },
    { title: 'Manufacturing Management',      image: 'assets/images/esat-mng-solution-page-image.jpg',      route: 'manufacturing',    },
    { title: 'Organization Development', image: 'assets/images/esat-od-solution-page-image.jpg', route: 'organization' },
    { title: 'Retail & POS Management', image: 'assets/images/esat-retail.jpg', route: 'retail' },
    { title: 'Warehouse Management', image: 'assets/images/esat-warehouse.jpg', route: 'warehouse' },
    { title: 'Fleet Management', image: 'assets/images/esat-fleet.jpg', route: 'fleet-management' },
    { title: 'CMMS Management', image: 'assets/images/esat-cmms.jpg', route: 'cmms' },
    { title: 'Shipment Management', image: 'assets/images/esat-shipment.jpg', route: 'shipmemt' },
    { title: 'Quality Management', image: 'assets/images/esat-quality.jpg', route: 'quality' },
  ];
}
