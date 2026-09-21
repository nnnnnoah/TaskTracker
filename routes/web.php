<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Features;
use App\Http\Controllers\AuthController;

// If the user is not logged in, display the Welcome page.
// If they are logged in, display the Home page.
Route::get('/', function () {
    return Auth::check()
        ? inertia('Home')
        : inertia('Welcome');
})->name('home');

Route::inertia('/lists', 'Lists', [
    
])->name('lists');

Route::inertia('/tasks', 'Tasks', [
    
])->name('tasks');

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'Login')->name('login');
    Route::inertia('/register', 'Register')->name('register');

    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
