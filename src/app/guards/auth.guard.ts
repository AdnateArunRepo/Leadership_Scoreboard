// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../core/services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   // canActivate(): boolean {

//   //   // Check whether AppWorks SSO session already exists
//   //   if (this.authService.isLoggedIn()) {

//   //     console.log('User is already logged in.');

//   //     // Redirect directly to dashboard
//   //     this.router.navigate(['/login']);

//   //     // Prevent LoginComponent from loading
//   //     return false;
//   //   }

//   //   // No SSO session → allow login page
//   //   console.log('User is not logged in.');

//   //   return true;
//   // }

//     canActivate(): boolean {

//     console.log('========== AuthGuard ==========');

//     const loggedIn = this.authService.isLoggedIn();

//     console.log('Is user logged in:', loggedIn);

//     if (loggedIn) {
//       console.log('User is logged in → Allow dashboard');
//       return true;
//     }

//     console.log('User is NOT logged in → Redirect login');

//   //  this.router.navigate(['/login']);
//       return router.createUrlTree(['/login']);
//     return false;
//   }

// }




import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const authGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('========== AuthGuard ==========');

  const loggedIn = authService.isLoggedIn();

  console.log('Is user logged in:', loggedIn);

  if (loggedIn) {

    console.log('User is logged in → Allow dashboard');

    return true;
  }

  console.log('User is NOT logged in → Redirect to login');

  return router.createUrlTree(['/login']);
};