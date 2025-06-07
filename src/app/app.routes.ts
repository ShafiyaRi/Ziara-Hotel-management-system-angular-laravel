import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'bookings', component: BookingsComponent },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
