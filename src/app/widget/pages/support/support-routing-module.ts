import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportHome } from './support-home/support-home';
import { RouterModule, Routes } from '@angular/router';
import { SupportLayout } from './support-layout/support-layout';
import { CertificateVerify } from './certificate-verify/certificate-verify';
import { Registor } from './registor/registor';





const routes: Routes = [

 {
    path: '',
    component: SupportLayout,   // 👈 ADD THIS WRAPPER
    children: [
      {path: '', component: SupportHome},
      {path: 'certificate-verify', component: CertificateVerify},
      {path: 'registor', component: Registor},
    ]
 }

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SupportRoutingModule {}
