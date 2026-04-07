<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Home', [
    
])->name('home');

Route::inertia('/register', 'Register', [
    
])->name('Register');

Route::inertia('/login', 'Login', [
    
])->name('Login');

// what is this
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');
// });

require __DIR__.'/settings.php';
