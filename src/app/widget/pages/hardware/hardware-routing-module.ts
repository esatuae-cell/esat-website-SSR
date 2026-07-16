import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AudioVisual } from "./audio-visual/audio-visual";
import { ElvSolution } from "./elv-solution/elv-solution";
import { HardwareHome } from "./hardware-home/hardware-home";
import { HardwareLayout } from "./hardware-layout/hardware-layout";
import { ItHardware } from "./it-hardware/it-hardware";
import { PhysicalSurvilance } from "./physical-survilance/physical-survilance";
import { SecurityAudit } from "./security-audit/security-audit";
import { TechnologyConsulting } from './technology-consulting/technology-consulting';

const routes: Routes = [
  {
    path: '',
    component: HardwareLayout,
    children: [
      { path: '', component: HardwareHome },
      { path: 'audio-visual', component: AudioVisual },
      { path: 'elv-solution', component: ElvSolution },
      { path: 'it-networking-solutions-in-uae', component: ItHardware },
      { path: 'physical-survilance', component: PhysicalSurvilance },
      { path: 'security-audit', component: SecurityAudit },
      {path:'technology-consulting',component:TechnologyConsulting}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HardwareRoutingModule {}