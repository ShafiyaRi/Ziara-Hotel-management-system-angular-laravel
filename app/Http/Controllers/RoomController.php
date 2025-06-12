<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RoomController extends Controller
{
    public function index()
    {
        return Room::all();
    }

    public function getRoomTypes(): JsonResponse
    {
        $rooms = Room::all();
        return response()->json($rooms);
    }

    public function show($id)
    {
        if ($id) {
            return response()->json(['success' => true, 'message' => 'rooms found', 'data' => Room::find($id)]);
        } else {
            return response()->json(['success' => false, 'message' => 'rooms not found']);
        }
    }

    public function destroy($id)
    {
        $deleted = Room::destroy($id);
        if ($deleted) {
            return response()->json(['success' => true, 'message' => 'Room deleted successfully']);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to delete room'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'roomType' => 'required|string|max:255',
            'facilities' => 'required|string',
            'payment' => 'required|string',

        ]);
        $user = Room::create([
            'roomType' => $request->roomType,
            'facilities' => $request->facilities,
            'payment' => $request->payment,


        ]);
        return response()->json(['success' => true, 'message' => 'Rooms created successfully', 'data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['success' => false, 'message' => 'Room not found'], 404);
        }
        $room->roomType = $request->roomType;
        $room->facilities = $request->facilities;
        $room->payment = $request->payment;
        $room->save();

        return response()->json(['success' => true, 'message' => 'Room updated successfully', 'data' => $room]);
    }

}
