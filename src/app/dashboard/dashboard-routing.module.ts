import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './settings/settings.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { RoomsComponent } from './rooms/rooms.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: '', component: RoomsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'booking-details', component: BookingDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    
  ]
})
export class DashboardRoutingModule { }
