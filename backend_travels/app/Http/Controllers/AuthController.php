<?php

// app/Http/Controllers/AuthController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Tambahkan validasi untuk 'user_type'
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            // 'user_type' => 'required|string|in:customer,admin', // Hapus baris ini
        ]);

        $data = $request->only('name', 'email', 'password');
        $data['password'] = Hash::make($data['password']);
        $data['user_type'] = 'customer'; // Tetapkan user_type ke 'customer' secara default

        if ($data['user_type'] === 'customer') {
            $user = Customer::create($data);
        } elseif ($data['user_type'] === 'admin') {
            $user = User::create($data);
        } else {
            return response()->json(['message' => 'Invalid user type'], 400);
        }

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $userType = $request->input('user_type');

        if ($userType === 'customer') {
            $user = Customer::where('email', $request->email)->first();
            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Personal Access Token')->plainTextToken;
                return response()->json(['token' => $token, 'user' => $user], 200);
            }
            return response()->json(['message' => 'Invalid credentials for customer'], 401);
        } elseif ($userType === 'admin') {
            if (Auth::guard('web')->attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('Personal Access Token')->plainTextToken;
                return response()->json(['token' => $token, 'user' => $user], 200);
            }
            return response()->json(['message' => 'Invalid credentials for admin'], 401);
        }

        return response()->json(['message' => 'User type not specified'], 400);
    }

    public function getProfile(Request $request)
    {
        $user = $request->user(); // Automatically retrieves the authenticated user
        return response()->json(['user' => $user], 200);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email',
            'password' => 'sometimes|string|min:8',
            'profile_picture' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('profile_picture')) {
            // Generate a unique file name
            $fileName = time() . '.' . $request->profile_picture->extension();
            // Store the file in the public directory
            $request->profile_picture->move(public_path('images'), $fileName);
            // Update the profile picture URL in the database
            $user->profile_picture_url = 'images/' . $fileName;
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user], 200);
    }
}