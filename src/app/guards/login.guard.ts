// import { CanActivateFn } from '@angular/router';

// export const loginGuard: CanActivateFn = (route, state) => {
//   return true;
// };

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../core/services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuard implements CanActivate {

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {

//     if (this.authService.isLoggedIn()) {

//       // Already logged in → don't show login page
//       this.router.navigate(['/dashboard']);

//       return false;
//     }

//     // Not logged in → allow login page
//     return true;
//   }
// }




import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const loginGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('========== LoginGuard ==========');

  const loggedIn = authService.isLoggedIn();

  console.log('Already logged in:', loggedIn);

  if (loggedIn) {

    console.log(
      'User already logged in → Redirecting to dashboard'
    );

    return router.createUrlTree(['/dashboard']);
  }

  console.log(
    'User is not logged in → Allow login page'
  );

  return true;
};