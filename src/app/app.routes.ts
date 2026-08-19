import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';

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
      ),
        canActivate: [loginGuard]
  },
//Leader Dashboard

   {
    path: 'leader-dashboard',
    loadComponent: () =>
      import('./features/leader-dashboard/leader-dashboard.component').then(
        m => m.LeaderDashboardComponent
      ),
       canActivate: [authGuard]
  },

  //dashboard

   {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
       canActivate: [authGuard]
  },

  // Admin Dashboard
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./features/admin/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
       canActivate: [authGuard]
  },

{
  path: 'my-inbox',
  loadComponent: () =>
    import('./my-inbox/my-inbox.component').then(
      m => m.MyInboxComponent
    ),
   canActivate: [authGuard]
},

  
  // Wildcard Route
  {
    path: '**',
    redirectTo: 'login'
  }
];
