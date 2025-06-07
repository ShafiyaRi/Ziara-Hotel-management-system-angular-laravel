import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../model/booking.model';
import { BookingsService } from '../services/bookings.service';
import { Room } from '../model/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  roomOptions: Room[] = [];

  bookingForm: FormGroup = new FormGroup({
    room_id: new FormControl(null, [Validators.required]),
    number_of_rooms: new FormControl(null, [Validators.required]),
    arrival_date: new FormControl(null, [Validators.required]),
    number_of_guests: new FormControl(null, [Validators.required]),
  });

  constructor(
    private bookingService: BookingsService,
    private roomService: RoomService
  ) {}
  ngOnInit(): void {
    this.loadRoomTypes();
  }
  loadRoomTypes() {
    this.roomService.getRoomTypes().subscribe((rooms) => {
      this.roomOptions = rooms;
    });
  }
  onBooking() {
    if (this.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingForm.value).subscribe(() => {
        swal({
          icon: 'success',
          title: 'Booking confirmed',
          text: 'Booking successful!',
        });
      }),
        console.log(this.bookingForm.value);
      this.bookingForm.reset();
    } else {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields! ',
      });
    }
    this.bookingForm.reset();
  }
}



