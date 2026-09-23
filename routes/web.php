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

// Apply the guest middleware to the login and register routes. This ensures that only unauthenticated users can access these routes.
Route::middleware('guest')->group(function () {
    // Display the login and register pages using Inertia.js.
    Route::inertia('/login', 'Login')->name('login');
    Route::inertia('/register', 'Register')->name('register');

    // Handle the login and register form submissions using the AuthController.
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});

// Apply the auth middleware to the logout route. This ensures that only authenticated users can access this route.
Route::middleware('auth')->group(function () {
    Route::inertia('/logout', 'Logout')->name('logout');

    // Handle the logout form submission using the AuthController.
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout.store');

    Route::inertia('/lists', 'Lists', [])->name('lists');
    Route::inertia('/tasks', 'Tasks', [])->name('tasks');

    Route::inertia('/list', 'List', [])->name('list');
    Route::inertia('/task', 'Task', [])->name('task');
});

require __DIR__ . '/settings.php';
