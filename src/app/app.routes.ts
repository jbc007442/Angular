import { Routes } from '@angular/router';

import { Layout } from './pages/layout/layout';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Vehicles } from './pages/vehicles/vehicles';
import { Booking } from './pages/booking/booking';
import { Customer } from './pages/customer/customer';

export const routes: Routes = [
  // Redirect root to login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login page (no layout)
  {
    path: 'login',
    component: Login,
  },

  // App layout (after login)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'vehicles', component: Vehicles },
      { path: 'booking', component: Booking },
      { path: 'customer', component: Customer },
    ],
  },

  // Wildcard fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
