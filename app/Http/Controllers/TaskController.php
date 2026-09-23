<?php

namespace App\Http\Controllers;

class TaskController extends Controller {
    protected $showRoute = 'tasks.show';
    protected $indexRoute = 'tasks.index';

    public function index() {

    }

    public function show($id) {
        // Logic to show a specific list by ID
    }
}