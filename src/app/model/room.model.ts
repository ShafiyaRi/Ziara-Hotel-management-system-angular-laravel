export interface Room {
    id: number,
    roomType:string,
    facilities:string,
    payment:string
}
export interface CreateRoomResponse {
    success: boolean;
    error?: string;
    message?: string;
    action:  string;
    
}