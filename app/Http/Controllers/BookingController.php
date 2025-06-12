<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index(){
        return Booking::all();
    }
  public function getRoomTypes(): JsonResponse{
    $rooms = Room::all();
    return response()->json($rooms);
  }

    public function store(Request $request){
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'number_of_rooms'=>'required|integer',
            'number_of_guests'=>'required|integer',
            'arrival_date'=>'required|date',
        ]);
        $userId = Auth::id();

        
        $booking = Booking::create([
            'user_id' => $userId,
            'room_id' => $request->room_id,
            'number_of_rooms'=> $request->number_of_rooms,
            'number_of_guests'=> $request->number_of_guests,
            'arrival_date'=> $request->arrival_date,
        ]);
        return response()->json(['success' => true, 'message' => 'Booking created successfully', 'data' => $booking]);
    }
   
    
    public function show($id){
        if ($id){
            return response()->json(['success'=>true,'message'=>'Booking found','data'=>Booking::find($id)]);
        }else{
            return response()->json(['success'=>false,'message'=>'Booking not found']);
        }
    }
    
}
