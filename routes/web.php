<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('home', [HomeController::class, 'home'])->name('home');
Route::post('profile',[HomeController::class, 'profile'])->name('profile.update');
Route::get('search-job', [HomeController::class, 'searchJob'])->name('job.search');
Route::post('apply-job/{job}', [HomeController::class, 'applyJob'])->name('apply.job');
