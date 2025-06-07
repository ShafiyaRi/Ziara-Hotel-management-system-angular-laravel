import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer, CreateCustomerResponse } from '../model/customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public apiUrl = 'http://localhost:8000/api';
  refreshGrid$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    
  
  return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`, {
      headers: this.getAuthHeaders(),
    });
  }

  search(
    customer_id: number
  ): Observable<{ status: boolean; data?: Customer[]; message?: string }> {
    return this.http.get<{
      status: boolean;
      data?: Customer[];
      message?: string;
    }>(`/customers/${customer_id}`);
  }

  addCustomer(customer: Customer): Observable<CreateCustomerResponse> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('Sending customer data:', customer);
    return this.http
      .post<CreateCustomerResponse>(`${this.apiUrl}/customers`, customer, {
        headers: header,
      })
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }

  deleteCustomer(customer: Customer): Observable<CreateCustomerResponse> {
    return this.http.delete<CreateCustomerResponse>(
      `${this.apiUrl}/customers/${customer.id}`
    );
  }

  // login(loginData: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, loginData);
  // }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(
        `${this.apiUrl}/customers/${customer.id}`,
        customer
      )
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }

  getCustomerCount(): Observable<CreateCustomerResponse> {
    return this.http
      .get<CreateCustomerResponse>(`${this.apiUrl}/customers`)
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }
}
