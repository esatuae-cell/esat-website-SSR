import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactLayout } from './contact-layout/contact-layout';
import { ContactMain } from './contact-main/contact-main';
import { FeedbackComponent } from './feedback/feedback';



const routes: Routes = [

 {
    path: '',
    component: ContactLayout,   // 👈 ADD THIS WRAPPER
    children: [

      {path:'',component:ContactMain},
      {path:'feedback', component:FeedbackComponent},
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

export class ContactRoutingModule {}
