import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CustomerService } from './services/customer.service';
import { Customer } from './model/customer.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private customerService: CustomerService) {
  } 
  
  public add(customer:Customer): void {
    this.customerService.addCustomer(customer);
  }
  title = 'ziarahotels';
}
