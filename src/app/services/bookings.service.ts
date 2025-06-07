import {Injectable} from '@angular/core';
import {Booking, CreateBookingresponse} from '../model/booking.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private apiUrl = 'http://localhost:8000/api';
  refreshGrid$: Subject<boolean> = new Subject<boolean>();

  constructor(public http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, {
      headers: this.getAuthHeaders(),
    });
  }

  addBooking(booking: Booking): Observable<CreateBookingresponse> {
    const header = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.http
      .post<CreateBookingresponse>(`${this.apiUrl}/bookings`, booking, {
        headers: this.getAuthHeaders(),
      })
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http
      .put<Booking>(`${this.apiUrl}/bookings/${booking.id}`, booking)
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }
}

//   deleteBooking(booking: Booking): Observable<CreateBookingresponse> {
//     return this.http.delete<CreateBookingresponse>(
//       `${this.apiUrl}/bookings/${booking.booking_id}`
//     );
//   }

//   getBookingCount(): Observable<CreateBookingresponse> {
//     return this.http
//       .get<CreateBookingresponse>(`${this.apiUrl}/bookings`)
//       .pipe(tap(() => this.refreshGrid$.next(true)));
//   }
// }
