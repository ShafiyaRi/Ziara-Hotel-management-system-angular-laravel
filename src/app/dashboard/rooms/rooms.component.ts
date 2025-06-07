import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Room } from '../../model/room.model';
import { RoomService } from '../../services/room.service';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rooms',
  // standalone: true,
  // imports: [ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  @Input() rooms: Room | null = null;
  room: Room[] = [];
  roomToDelete: Room | undefined;
  roomForm: FormGroup = new FormGroup({
    roomType: new FormControl(null, [Validators.required]),
    facilities: new FormControl(null, [Validators.required]),
    payment: new FormControl(null, [Validators.required]),
  });

  constructor(
    private roomService: RoomService,
    // private toastr: ToastrService
  ) {}

  save() {
    if (this.roomForm.valid) {
      if (this.rooms && this.rooms.id) {
        const updatedRoom = {
          ...this.roomForm.value,
          id: this.rooms.id,
        };
        this.roomService.updateRooms(updatedRoom).subscribe(
          (resp) => {
            console.log('Room updated successfully:', resp);
            // this.toastr.success('Room updated successfully!', 'Success');
            this.roomForm.reset();
            this.getRooms();
          },
          (error) => {
            console.error('Error updating room', error);
            // this.toastr.error('Error updating room.', 'Error');
          }
        );
      } else {
        this.roomService.addRooms(this.roomForm.value).subscribe(
          (resp) => {
            console.log('Room added successfully:', resp);
            // this.toastr.success('Room added successfully!', 'Success');
            this.roomForm.reset();
            this.getRooms();
          },
          (error) => {
            console.error('Error adding room', error);
            // this.toastr.error('Error adding room.', 'Error');
          }
        );
      }
    } else {
      console.error('Form is invalid');
      // this.toastr.warning('Please fill out the form correctly.', 'Warning');
    }
  }

  ngOnInit(): void {
    if (this.rooms) {
      this.populateRoomForm(this.rooms);
    }
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getAllRooms().subscribe(
      (rooms) => {
        this.room = rooms;
      },
      (error) => {
        console.error('Error fetching rooms', error);
      }
    );
  }

  populateRoomForm(room: Room): void {
    this.rooms = room;
    this.roomForm.patchValue({
      roomType: room.roomType,
      facilities: room.facilities,
      payment: room.payment,
    });
  }

  deleteRooms(room: Room): void {
    console.log('Room to delete:', room);
    if (!room.id) {
      console.error('Room ID is undefined.');
      return;
    }
    const confirmed = confirm('Are you sure you want to delete this room?');
    if (confirmed) {
      this.roomService.deleteRoom(room).subscribe(
        (resp) => {
          console.log('Room deleted successfully', resp);
          this.getRooms();
        },
        (error) => {
          console.error('Error deleting room', error);
        }
      );
    }
  }
}
