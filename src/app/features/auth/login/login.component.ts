// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { HeroService } from '../../../services/hero.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
declare var $: any;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],

      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    console.log(this.loginForm.value);

    // Call API here
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    $.cordys.authentication.sso
      .authenticate(username, password)
      .done((resp: any) => {
        console.log('Login Successful', resp);

        // Store credentials if required
        //  this.heroService.setCredentials(username, password);

        // Navigate to dashboard
        //this.router.navigate(['/admin-dashboard']);
        //  this.router.navigate(['/leader-dashboard']);
        this.router.navigate(['/dashboard']);
        localStorage.setItem('username', username);
      })
      .fail((err: any) => {
        console.error('Login Failed', err);

        alert('Invalid Username or Password');
      });
  }
}
