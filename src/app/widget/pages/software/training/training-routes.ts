import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetTraining } from "./asset-training/asset-training";
import { TrainingHome } from "./training-home/training-home";
import { TrainingLayout } from "./training-layout/training-layout";
import { CrmTraining } from './crm-training/crm-training';
import { FacilityTraining } from './facility-training/facility-training';
import { FinanceTraining } from './finance-training/finance-training';
import { HrmTraining } from './hrm-training/hrm-training';
import { HcmTraining } from './hcm-training/hcm-training';
import { PayrollTraining } from './payroll-training/payroll-training';
import { ContractTraining } from './contract-training/contract-training';
import { InventoryTraining } from './inventory-training/inventory-training';
import { ProcurementTraining } from './procurement-training/procurement-training';
import { SalesTraining } from './sales-training/sales-training';
import { BudgetTraining } from './budget-training/budget-training';
import { RealEstateTraining } from './real-estate-training/real-estate-training';
import { ManufacturingTraining } from './manufacturing-training/manufacturing-training';
import { OrganizationTraining } from './organization-training/organization-training';
import { RetailTraining } from './retail-training/retail-training';
import { WarehouseTraining } from './warehouse-training/warehouse-training';
import { FleetTraining } from './fleet-training/fleet-training';
import { CmmsTraining } from './cmms-training/cmms-training';
import { ShipmentTraining } from './shipment-training/shipment-training';
import { QualityTraining } from './quality-training/quality-training';


export const routes: Routes = [
  {
    path: '',
    component: TrainingLayout,   // 👈 ADD THIS WRAPPER
    children: [
    {path:'',component:TrainingHome },
    {path:'asset-training',component:AssetTraining},
    {path:'crm-training',component:CrmTraining},
    {path:'facility-training',component:FacilityTraining},
    {path:'finance-training',component:FinanceTraining},
    {path:'hrm-training',component:HrmTraining},
    {path:'hcm-training', component:HcmTraining},
    {path:'payroll-training',component:PayrollTraining},
    {path:'contract-training',component:ContractTraining},
    {path:'inventory-training',component:InventoryTraining},
    {path:'procurement-training',component:ProcurementTraining},
    {path:'sales-training',component:SalesTraining},
    {path:'budget-training',component:BudgetTraining},
    {path:'real-estate-training',component:RealEstateTraining},
    {path:'manufacturing-training',component:ManufacturingTraining},
    {path:'organization-training',component:OrganizationTraining},
    {path:'retail-training',component:RetailTraining},
    {path:'warehouse-training',component:WarehouseTraining},
    {path:'fleet-training',component:FleetTraining},
    {path:'cmms-training',component:CmmsTraining},
    {path:'shipment-training',component:ShipmentTraining},
    {path:'quality-training',component:QualityTraining}

    ]
  }
]