import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusnessHome } from './busness-home/busness-home';
import { FacilityService } from './facility-service/facility-service';
import { FixedAsset } from './fixed-asset/fixed-asset';
import { BusinessHomeLayout } from './business-home-layout/business-home-layout';
import { BudgetProject } from './budget-project/budget-project';
import { Contract } from './contract/contract';
import { Crm } from './crm/crm';

import { Hcm } from './hcm/hcm';
import { Hrm } from './hrm/hrm';
import { Inventory } from './inventory/inventory';
import { Manufacturing } from './manufacturing/manufacturing';
import { Organization } from './organization/organization';
import { Payroll } from './payroll/payroll';
import { Procurement } from './procurement/procurement';
import { Quality } from './quality/quality';
import { RealEstate } from './real-estate/real-estate';
import { Retail } from '../business-industry/retail/retail';
import { RetailPOS } from './retail-pos/retail-pos';
import { Sales } from './sales/sales';
import { Shipment } from './shipment/shipment';
import { Warehouse } from './warehouse/warehouse';
import { CMMS } from './cmms/cmms';
import { Fleet } from './fleet/fleet';
import { FinanceAccounts } from './finance-accounts/finance-accounts';



export const routes: Routes = [
  {
    path: '',
    component: BusinessHomeLayout,   // 👈 ADD THIS WRAPPER
    children: [

{path:'', component :BusnessHome},
  {path:'asset-management', component:FixedAsset},
  {path:'budject-management',component:BudgetProject},
  {path:'cmms',component:CMMS},
  {path:'contract-management',component:Contract},
  {path:'crm',component:Crm},
  {path:'finance-management',component:FinanceAccounts},
  {path:'fleet-management',component:Fleet},
  {path:'hcm',component:Hcm},
  {path:'hrm',component:Hrm},
  {path:'Inventory',component:Inventory},
  {path:'manufacturing',component:Manufacturing},
  {path:'organization',component:Organization},
  {path:'payroll',component:Payroll},
  {path:'procurement',component:Procurement},
  {path:'quality',component:Quality},
  {path:'real-estate',component:RealEstate},
  {path:'retail',component:RetailPOS},
  {path:'sales',component:Sales},
  {path:'shipmemt',component:Shipment},
  {path:'warehouse',component:Warehouse},
  {path:'facility',component:FacilityService}
 
    ]
  }
]




