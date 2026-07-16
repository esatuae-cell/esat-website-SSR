import { Routes } from '@angular/router';
import { BusinessIndustryHome } from './business-industry-home/business-industry-home';
import { CompleteManag } from './complete-manag/complete-manag';
import { ConstructionManag } from './construction-manag/construction-manag';
import { FacilityManag } from './facility-manag/facility-manag';
import { FleetManag } from './fleet-manag/fleet-manag';
import { ManufacturingManag } from './manufacturing-manag/manufacturing-manag';
import { RealEstateManag } from './real-estate-manag/real-estate-manag';
import { Retail } from './retail/retail';
import { Shipping } from './shipping/shipping';
import { Warehouse } from './warehouse/warehouse';
import { BusinessIndustry } from './business-industry/business-industry';
import { Cmms } from './cmms/cmms';

export const routes: Routes = [
  {
    path: '',
    component: BusinessIndustry, // 👈 ADD THIS WRAPPER
    children: [
      { path: '', component: BusinessIndustryHome },
      { path: 'complete-mng', component: CompleteManag },
      { path: 'constrution-mng', component: ConstructionManag },
      { path: 'facility-mng', component: FacilityManag },
      { path: 'fleet-mng', component: FleetManag },
      { path: 'manufacturing-mng', component: ManufacturingManag },
      { path: 'real-estate', component: RealEstateManag },
      { path: 'retail', component: Retail },
      { path: 'shipping', component: Shipping },
      { path: 'warehouse', component: Warehouse },
      { path: 'cmms', component: Cmms },
    ],
  },
];
