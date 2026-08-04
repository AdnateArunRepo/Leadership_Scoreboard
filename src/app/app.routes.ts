import { Routes } from '@angular/router';

export const routes: Routes = [


  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        m => m.LoginComponent
      )
  },
//Leader Dashboard

   {
    path: 'leader-dashboard',
    loadComponent: () =>
      import('./features/leader-dashboard/leader-dashboard.component').then(
        m => m.LeaderDashboardComponent
      )
  },

  //dashboard

   {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      )
  },

  // Admin Dashboard
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      )
  },

  // Wildcard Route
  {
    path: '**',
    redirectTo: 'login'
  }
];
