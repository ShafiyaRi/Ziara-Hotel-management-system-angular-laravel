<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     */
    

     
    public function run(): void
    {
        DB::table('users')->insert([
            'first_name' => 'shafiya',
            'last_name' => 'rizvi',
            'gender' => 'female',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'usertype' => 1,
        ]);
    }
}
