import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoftwareHome } from './software-home/software-home';
import { SecureErp } from './secure-erp/secure-erp';
import { ErpFeature } from './erp-feature/erp-feature';
import { EsatBenefits } from './esat-benefits/esat-benefits';
import { PackageList } from './package-list/package-list';
import { SoftwareSupport } from './software-support/software-support';


const routes: Routes = [
  { path: '', component: SoftwareHome },

  {path: 'erp-software-solutions-uae', component: SecureErp },
  {path:'software-services',component:SoftwareSupport},
  {path: 'erp-feature', component: ErpFeature },
  {path: 'erp-benifites', component: EsatBenefits },

  {
    path: 'solution-business',
    loadChildren: () =>
      import('./business/busness-home-routing')
        .then(m => m.routes),
  },
  {
    path: 'solution-industry',
    loadChildren: () =>
      import('./business-industry/business-industry-routes')
        .then(m => m.routes),   // 👈 IMPORTANT FIX
  },

  { path: 'package', component: PackageList },

  // { path: 'training', component: ErpTraining },

  {
    path: 'training',
    loadChildren: () =>
      import('./training/training-routes')
        .then(m => m.routes),   // 👈 IMPORTANT FIX
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoftwareRoutingModule {}