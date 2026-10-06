<?php

use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Register tour folders in public/rooms3D that have no room in the database yet
Artisan::command('rooms:import', function () {
    $folders = collect(glob(public_path('rooms3D/*'), GLOB_ONLYDIR))
        ->filter(fn ($dir) => is_file($dir . '/index.htm'))
        ->map(function ($dir) {
            $covers = glob($dir . '/cover/*.{jpg,jpeg,png,JPG,JPEG,PNG}', GLOB_BRACE) ?: [];
            $cover = $covers[0] ?? null;

            return [
                'folder' => 'rooms3D/' . basename($dir),
                'cover' => $cover ? 'rooms3D/' . basename($dir) . '/cover/' . basename($cover) : null,
                // Covers are named "<upload timestamp>_<name>", so this keeps the original upload order
                'uploaded' => $cover ? (int) strtok(basename($cover), '_') : 0,
            ];
        })
        ->sortBy('uploaded');

    $imported = 0;
    foreach ($folders as $tour) {
        if (Room::where('image', $tour['folder'] . '/index.htm')->exists()) {
            continue;
        }
        if (! $tour['cover']) {
            $this->warn("Skipped {$tour['folder']}: no cover image found.");
            continue;
        }

        $room = Room::create([
            'name' => Str::title(str_replace('_', ' ', basename($tour['folder']))),
            'image' => $tour['folder'] . '/index.htm',
            'cover' => $tour['cover'],
            'sort_order' => (Room::max('sort_order') ?? 0) + 1,
        ]);
        $this->info("Imported {$room->name}");
        $imported++;
    }

    $this->info("{$imported} room(s) imported.");
})->purpose('Add existing tour folders in public/rooms3D to the database');

// Public registration is closed, so admin accounts are created and managed here
Artisan::command('user:make-admin {email} {--name= : Name for a new account} {--password= : Password for a new account} {--revoke : Remove admin access instead}', function (string $email) {
    $user = User::where('email', $email)->first();

    if (! $user) {
        if ($this->option('revoke')) {
            $this->error("User {$email} not found.");
            return 1;
        }

        $name = $this->option('name') ?: $this->ask('Name');
        $password = $this->option('password') ?: $this->secret('Password (min. 8 characters)');

        if (! $name || strlen((string) $password) < 8) {
            $this->error('A name and a password of at least 8 characters are required.');
            return 1;
        }

        $user = new User(['name' => $name, 'email' => $email, 'password' => Hash::make($password)]);
        $user->email_verified_at = now();
        $this->info("Created account {$email}.");
    }

    $user->is_admin = ! $this->option('revoke');
    $user->save();

    $this->info($user->is_admin ? "{$email} is now an admin." : "{$email} is no longer an admin.");
})->purpose('Create an admin account, or grant/revoke admin access for an existing user');
