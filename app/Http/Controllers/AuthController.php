<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $redirectTo = '/';

    // Handles login logic. This function checks if the provided credentials match a user in the database and logs them in if they do.
    public function login(Request $request)
    {
        // Validate the incoming login data. This ensures that both the name and password are provided.
        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to log the user in with the provided credentials.
        // If successful, regenerate the session now that they are authed and redirect them to the home page.
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
    
            return redirect()->intended($this->redirectTo);
        }
    
        // If the login attempt fails, redirect back to the login page with an error message.
        return back()->withErrors([
            'login' => 'Invalid credentials.',
        ]);
    }

    // Handles user registration. This function creates a new user in the database with the provided data.
    public function register(Request $request) {
        // Validate the incoming registration data. This ensures that the name is unique and the password meets certain criteria.
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:3|max:255',
        ]);

        // If the data is valid, create a new user and log them in.
        $user = User::create([
            'name' => $validated['name'],
            'password' => $validated['password'],
        ]);
        
        // Log the user in after successful registration.
        Auth::login($user);
        
        // Redirect them to the homepage.
        return redirect()->intended($this->redirectTo);
    }

    // Handles user logout. This function logs the user out and invalidates their session.
    public function logout(Request $request) {
        // Log the user out using Laravel's Auth facade (simplified interface for a library).
        Auth::logout();

        // Invalidate the user's session to prevent session fixation attacks.
        $request->session()->invalidate();

        // Regenerate the CSRF token to ensure that the next request is secure.
        $request->session()->regenerateToken();

        // Redirect the user to the homepage after logging out.
        return redirect()->intended($this->redirectTo);
    }
}