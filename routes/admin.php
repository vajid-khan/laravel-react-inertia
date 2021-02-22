<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminHomeController;
use App\Http\Controllers\Admin\JobController;

Route::get('login', [AdminHomeController::class, 'login']);
Route::post('login', [AdminHomeController::class, 'adminLogin'])->name('login');
Route::post('logout', [AdminHomeController::class, 'logout'])->name('logout');

Route::resource('job', JobController::class);
Route::get('home', [AdminHomeController::class, 'home'])->name('home');
Route::get('search-candidate', [AdminHomeController::class, 'searchCandidate'])->name('search.candidate');



