<?php

namespace App\Http\Controllers;

class ListController extends Controller {
    protected $showRoute = 'lists.show';
    protected $indexRoute = 'lists.index';

    public function index() {

    }

    public function show($id) {
        // Logic to show a specific list by ID
    }
}