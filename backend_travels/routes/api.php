<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DestinationCategoryController;
use App\Http\Controllers\AuthController;



// customer
Route::get('/customers', [CustomerController::class, 'index']);
Route::get('/customers/{id}', [CustomerController::class, 'show']);
Route::post('/customers', [CustomerController::class, 'store']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

// destionation category
Route::get('/destination-categories', [DestinationCategoryController::class, 'index']);
Route::get('/destination-categories/{id}', [DestinationCategoryController::class, 'show']);
Route::post('/destination-categories', [DestinationCategoryController::class, 'store']);
Route::put('/destination-categories/{id}', [DestinationCategoryController::class, 'update']);
Route::delete('/destination-categories/{id}', [DestinationCategoryController::class, 'destroy']);

// CRUD API
Route::apiResource('destination-categories', DestinationCategoryController::class);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
// routes/api.php
Route::middleware('auth:sanctum')->get('/user-profile', [AuthController::class, 'getProfile']);

// routes/api.php
Route::middleware('auth:sanctum')->put('/update-profile', [AuthController::class, 'updateProfile']);

// Route::put('update-profile', [AuthController::class, 'updateProfile']);