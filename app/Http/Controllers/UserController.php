<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    //  private $seededEmail = 'admin@gmail.com';

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // $usertype = ($request->email === $this->$email) ? 1 : 2;

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'usertype' => 2,
        ]);

        return response()->json(['success' => true, 'message' => 'user created successfully', 'data' => $user]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();


        if (! $user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        // $redirectTo = $user->usertype === 1 ? 'dashboard' : 'booking';

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usertype' => $user->usertype,
            // 'redirect_to' => $redirectTo,
        ]);
    }
    public function index() {
        return User::all();
    }
   
    }
    



