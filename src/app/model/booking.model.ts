export interface Booking {
  id: number;
  user_id:number;
  room_id:number;
  number_of_rooms: number;
  number_of_guests: number;
  arrival_date: Date;
}

export interface CreateBookingresponse{
    message: string;
    error?: string;
    success: boolean;
    action: string;
    bookingCount:number;

}