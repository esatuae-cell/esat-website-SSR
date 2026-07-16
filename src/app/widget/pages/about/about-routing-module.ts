import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FounderMsg } from './founder-msg/founder-msg';
import { SocialResponsibility } from './social-responsibility/social-responsibility';
import { Team } from './team/team';
import { Enveronment } from './enveronment/enveronment';
import { OurPhilosophy } from './our-philosophy/our-philosophy';
import { OurStories } from './our-stories/our-stories';
import { OurExperience } from './our-experience/our-experience';
import { Awards } from './awards/awards';
import { News } from './news/news';
import { QualityPolicy } from './quality-policy/quality-policy';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { Terms } from './terms/terms';
import { AboutMain } from './about-main/about-main';
import { AboutLayout } from './about-layout/about-layout';
import { CommonModule } from '@angular/common';

const routes: Routes = [


{ path:"", component:AboutLayout,

  children: [

  { path: '', component: AboutMain },
  { path: 'founder-msg', component: FounderMsg },
  { path: 'team', component: Team },
  { path: 'environment', component: Enveronment },
  { path: 'philosophy', component: OurPhilosophy },
  { path: 'social', component: SocialResponsibility },
  { path: 'story', component: OurStories },
  { path: 'experience', component: OurExperience },
  { path: 'awards', component: Awards },
  { path: 'news', component: News },
  { path: 'qualitypolicy', component: QualityPolicy },
  { path: 'privacypolicy', component: PrivacyPolicy },
  { path: 'terms', component: Terms }

 
  ]
}

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AboutRoutingModule {}
