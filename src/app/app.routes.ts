import { Routes } from '@angular/router';

import { HomeComponent } from './widget/pages/home/home';
import { Partnership } from './widget/pages/partnership/partnership';
import { Careers } from './widget/pages/careers/careers';
import { Clients } from './widget/pages/clients/clients';
import { TrailComponent } from './widget/pages/trail/trail';
import { Advertisement } from './widget/pages/advertisement/advertisement';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'about',
    loadChildren: () => import('./widget/pages/about/about-module').then((m) => m.AboutModule),
  },

  {
    path: 'software',
    loadChildren: () =>
      import('./widget/pages/software/software-module').then((m) => m.SoftwareModule),
  },

  {
    path: 'hardware',
    loadChildren: () =>
      import('./widget/pages/hardware/hardware-module').then((m) => m.HardwareModule),
  },

  {
    path: 'partnership',
    component: Partnership,
  },

  {
    path: 'careers',
    component: Careers,
  },

  {
    path: 'our-clients',
    component: Clients,
  },

  {
    path: 'support',
    loadChildren: () =>
      import('./widget/pages/support/support-module').then((m) => m.SupportModule),
  },

  {
    path: 'contact',
    loadChildren: () =>
      import('./widget/pages/contact/contact-module').then((m) => m.ContactModule),
  },

  {
    path: 'free-trail',
    component: TrailComponent,
  },

  {
    path: 'advertisement',
    component: Advertisement,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
