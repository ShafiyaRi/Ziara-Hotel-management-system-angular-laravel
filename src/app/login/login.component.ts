import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from '../services/authentication.service';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    LottieComponent,
    // ToastrModule,
  ],
  // providers: [ToastrService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  LoginOptions: AnimationOptions = {
    path: '/assets/login-anima.json',
    autoplay: true,
    loop: true,
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    // private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.loginData(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.access_token && response.usertype === 1) {
            localStorage.setItem('adminToken', response.access_token);

            // this.toastr.success('Hello world!', 'Toastr fun!');

            this.router.navigate(['/dashboard']);
          } else if (response.access_token && response.usertype === 2) {
            localStorage.setItem('adminToken', response.access_token);
            swal({
              icon: 'success',
              title: 'Login successful',
              text: 'Welcome customer.',
            });
            this.router.navigate(['/bookings']);
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          swal({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid credentials or server error.',
          });
        },
      });
    } else {
      swal({
        icon: 'error',
        title: 'Invalid Data',
        text: 'Please fill in all required fields.',
      });
    }
  }

  // onLogin(): void {
  //   if (this.loginForm.valid) {
  //     this.authService.loginData(this.loginForm.value).subscribe({
  //       next: (response) => {
  //         if (response.token) {
  //           localStorage.setItem('adminToken', response.token);
  //           this.router.navigate(['/dashboard']);
  //         } else {
  //           this.errorMessage = 'Login failed: Invalid token';
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Login failed', err);
  //         this.errorMessage =
  //           'Login failed: Invalid credentials or server error';
  //       },
  //     });
  //   }

  // }
}
