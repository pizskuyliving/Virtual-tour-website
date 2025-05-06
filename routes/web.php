<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\Room;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $rooms = Room::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rooms' => $rooms
    ]);
});
Route::get('/Organization', function () {
    $rooms = Room::all();
    return Inertia::render('Organization', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rooms' => $rooms
    ]);
});
Route::get('/Rooms', function () {
    $rooms = Room::all();
    return Inertia::render('RoomsHome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rooms' => $rooms
    ]);
});

Route::get('/panorama', function () {
    $rooms = Room::all();
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rooms' => $rooms
    ]);
});

Route::prefix('rooms')->group(function () {
    Route::get('/', [RoomController::class, 'index'])->name('room.index');
    Route::post('/', [RoomController::class, 'store'])->name('room.store');
    Route::get('/{room}', [RoomController::class, 'show'])->name('room.show');
    Route::post('/{room}', [RoomController::class, 'update'])->name('room.update');
    Route::delete('/{room}', [RoomController::class, 'destroy'])->name('room.destroy');
});

Route::get('/dashboard', function () {
    $rooms = Room::all();
    $rooms->each(function ($room) {
        $room->cover = asset('/' . $room->cover);
    });
    return Inertia::render('Dashboard', [
        'rooms' => $rooms
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
