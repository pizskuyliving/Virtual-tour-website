<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\Room;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'rooms' => Room::ordered()->get(),
    ]);
});

Route::get('/Organization', function () {
    return Inertia::render('Organization');
});

// Old URL for the rooms list, kept so existing links and bookmarks still work
Route::redirect('/Rooms', '/rooms', 301);

Route::prefix('rooms')->group(function () {
    Route::get('/', [RoomController::class, 'index'])->name('room.index');
    Route::get('/{room}', [RoomController::class, 'show'])->name('room.show');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::post('/', [RoomController::class, 'store'])->name('room.store');
        Route::post('/{room}/move', [RoomController::class, 'move'])->name('room.move');
        Route::post('/{room}', [RoomController::class, 'update'])->name('room.update');
        Route::delete('/{room}', [RoomController::class, 'destroy'])->name('room.destroy');
    });
});

Route::get('/dashboard', function () {
    $rooms = Room::ordered()->get();
    $rooms->each(function ($room) {
        $room->cover = asset('/' . $room->cover);
    });
    return Inertia::render('Dashboard', [
        'rooms' => $rooms
    ]);
})->middleware(['auth', 'verified', 'admin'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
