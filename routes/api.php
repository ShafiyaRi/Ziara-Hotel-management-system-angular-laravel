<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);



Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/customers', [UserController::class, 'index']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::get('/rooms', [RoomController::class, 'index']);
    Route::delete('rooms/{id}', [RoomController::class, 'destroy']);
    Route::get('/rooms/{id}', [RoomController::class, 'show']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);

});
// Route::get('/customers/{id}', [UserController::class, 'show']);
// Route::put('/customers/{id}', [UserController::class, 'update']);
// Route::delete('/customers/{id}', [UserController::class, 'destroy']);
// Route::get('/customers',[UserController::class, 'get-customer-count']);

Route::middleware(['auth:sanctum', 'customer'])->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/roomTypes', [RoomController::class, 'getRoomTypes']);
    // Route::get('/bookings/{id}', [BookingController::class, 'show']);
    // Route::put('/bookings/{id}', [BookingController::class, 'update']);
    // Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
});
