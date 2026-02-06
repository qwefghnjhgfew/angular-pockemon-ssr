import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pockemons/page',
    loadComponent: () => import('./pages/pockemons/pockemons-page'),
  },
  {
    path: 'pockemons/id',
    loadComponent: () => import('./pages/pokemo/pokemo-page'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
