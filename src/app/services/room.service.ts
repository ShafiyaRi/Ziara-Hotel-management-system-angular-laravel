import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
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

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`, {
      headers: this.getAuthHeaders(),
    });
  }

getRoomTypes(): Observable<Room[]>{
  return this.http.get<Room[]>(`${this.apiUrl}/roomTypes`,{
   headers: this.getAuthHeaders(),
});
}

  addRooms(room: Room): Observable<Room> {
    return this.http
      .post<Room>(`${this.apiUrl}/rooms`, room, {
        headers: this.getAuthHeaders(),
      })
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }

  updateRooms(room: Room): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/rooms/${room.id}`,room, {
        headers: this.getAuthHeaders(),
      })
      // .pipe(tap(() => this.refreshGrid$.next(true)));

  }

  deleteRoom(room: Room): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/rooms/${room.id}`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
  
}
