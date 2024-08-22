<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DestinationCategoryController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
//     Route::resource('categories', DestinationCategoryController::class);
// });

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/categories', [DestinationCategoryController::class, 'index'])->name('admin.categories.index');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/admin/categories', [DestinationCategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('/admin/categories/create', [DestinationCategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('/admin/categories', [DestinationCategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('/admin/categories/{id}/edit', [DestinationCategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/admin/categories/{id}', [DestinationCategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{id}', [DestinationCategoryController::class, 'destroy'])->name('admin.categories.destroy');
});

require __DIR__ . '/auth.php';