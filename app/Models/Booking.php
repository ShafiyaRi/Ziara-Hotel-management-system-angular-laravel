<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Booking extends Model
{

  protected $fillable = [
    'user_id',
    'room_id',
    'number_of_rooms',
    'number_of_guests',
    'arrival_date',
  ];
}
