<?php

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

function makeTourZip(array $extraFiles = []): UploadedFile
{
    $path = tempnam(sys_get_temp_dir(), 'tour') . '.zip';
    $zip = new ZipArchive;
    $zip->open($path, ZipArchive::CREATE);
    $zip->addFromString('index.htm', '<html>tour</html>');
    foreach ($extraFiles as $name => $contents) {
        $zip->addFromString($name, $contents);
    }
    $zip->close();

    return new UploadedFile($path, 'tour.zip', 'application/zip', null, true);
}

afterEach(function () {
    File::deleteDirectory(public_path('rooms3D/pest_test_room'));
    File::deleteDirectory(public_path('rooms3D/pest_renamed_room'));
    File::deleteDirectory(public_path('rooms3D/pest_second_room'));
});

function createRoomAs(User $admin, string $name): Room
{
    test()->actingAs($admin)->post('/rooms', [
        'name' => $name,
        'file' => makeTourZip(),
        'cover' => UploadedFile::fake()->image('cover.jpg'),
    ])->assertSessionHasNoErrors();

    return Room::latest('id')->firstOrFail();
}

test('public registration is closed', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertNotFound();

    $this->assertGuest();
});

test('old and unused pages are gone or redirected', function () {
    $this->get('/Rooms')->assertRedirect('/rooms');
    $this->get('/panorama')->assertNotFound();
});

test('public pages do not expose framework versions', function () {
    $this->get('/')->assertInertia(fn ($page) => $page
        ->component('Welcome')
        ->missing('laravelVersion')
        ->missing('phpVersion'));
});

test('the uploaded zip is not kept in the public folder', function () {
    createRoomAs(User::factory()->admin()->create(), 'Pest Test Room');

    expect(glob(public_path('rooms3D/pest_test_room/*.zip')))->toBeEmpty();
});

test('renaming a room moves its folder instead of leaving the old one behind', function () {
    $admin = User::factory()->admin()->create();
    $room = createRoomAs($admin, 'Pest Test Room');

    $this->actingAs($admin)
        ->post("/rooms/{$room->id}", ['name' => 'Pest Renamed Room'])
        ->assertSessionHasNoErrors();

    $room->refresh();
    expect($room->image)->toBe('rooms3D/pest_renamed_room/index.htm')
        ->and(file_exists(public_path($room->image)))->toBeTrue()
        ->and(file_exists(public_path($room->cover)))->toBeTrue()
        ->and(is_dir(public_path('rooms3D/pest_test_room')))->toBeFalse();
});

test('two rooms cannot share the same folder', function () {
    $admin = User::factory()->admin()->create();
    createRoomAs($admin, 'Pest Test Room');
    $second = createRoomAs($admin, 'Pest Second Room');

    $this->actingAs($admin)->post('/rooms', [
        'name' => 'pest test room',
        'file' => makeTourZip(),
        'cover' => UploadedFile::fake()->image('cover.jpg'),
    ])->assertSessionHasErrors('name');

    $this->actingAs($admin)
        ->post("/rooms/{$second->id}", ['name' => 'Pest Test Room'])
        ->assertSessionHasErrors('name');

    expect(Room::count())->toBe(2)
        ->and($second->fresh()->image)->toBe('rooms3D/pest_second_room/index.htm');
});

test('admins can reorder rooms and visitors see the new order', function () {
    $admin = User::factory()->admin()->create();
    $first = Room::create(['name' => 'A', 'image' => 'rooms3D/a/index.htm', 'cover' => 'a.jpg', 'sort_order' => 1]);
    $second = Room::create(['name' => 'B', 'image' => 'rooms3D/b/index.htm', 'cover' => 'b.jpg', 'sort_order' => 2]);
    $third = Room::create(['name' => 'C', 'image' => 'rooms3D/c/index.htm', 'cover' => 'c.jpg', 'sort_order' => 3]);

    $this->actingAs($admin)->post("/rooms/{$third->id}/move", ['direction' => 'up'])->assertRedirect();
    $this->actingAs($admin)->post("/rooms/{$first->id}/move", ['direction' => 'up'])->assertRedirect();

    expect(Room::ordered()->pluck('name')->all())->toBe(['A', 'C', 'B']);

    $this->get('/rooms')->assertInertia(fn ($page) => $page
        ->where('rooms.0.name', 'A')
        ->where('rooms.1.name', 'C')
        ->where('rooms.2.name', 'B'));
});

test('non-admins cannot reorder rooms', function () {
    $room = Room::create(['name' => 'A', 'image' => 'rooms3D/a/index.htm', 'cover' => 'a.jpg']);

    $this->post("/rooms/{$room->id}/move", ['direction' => 'up'])->assertRedirect('/login');
    $this->actingAs(User::factory()->create())
        ->post("/rooms/{$room->id}/move", ['direction' => 'up'])
        ->assertForbidden();
});

test('rooms:import registers existing tour folders only once', function () {
    $this->artisan('rooms:import')->assertSuccessful();
    $count = Room::count();

    $this->artisan('rooms:import')->assertSuccessful();

    expect(Room::count())->toBe($count);
    Room::all()->each(fn ($room) => expect(file_exists(public_path($room->image)))->toBeTrue());
});

test('rooms index page is displayed', function () {
    $this->get('/rooms')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('RoomsHome'));
});

test('guests cannot create, update or delete rooms', function () {
    $room = Room::create(['name' => 'Ruang', 'image' => 'rooms3D/ruang/index.htm', 'cover' => 'x.jpg']);

    $this->post('/rooms', ['name' => 'Hack'])->assertRedirect('/login');
    $this->post("/rooms/{$room->id}", ['name' => 'Hack'])->assertRedirect('/login');
    $this->delete("/rooms/{$room->id}")->assertRedirect('/login');

    expect(Room::find($room->id)->name)->toBe('Ruang');
});

test('non-admin users cannot manage rooms or open the dashboard', function () {
    $user = User::factory()->create();
    $room = Room::create(['name' => 'Ruang', 'image' => 'rooms3D/ruang/index.htm', 'cover' => 'x.jpg']);

    $this->actingAs($user)->get('/dashboard')->assertForbidden();
    $this->actingAs($user)->post('/rooms', [
        'name' => 'Pest Test Room',
        'file' => makeTourZip(),
        'cover' => UploadedFile::fake()->image('cover.jpg'),
    ])->assertForbidden();
    $this->actingAs($user)->post("/rooms/{$room->id}", ['name' => 'Hack'])->assertForbidden();
    $this->actingAs($user)->delete("/rooms/{$room->id}")->assertForbidden();

    expect(Room::count())->toBe(1)
        ->and(is_dir(public_path('rooms3D/pest_test_room')))->toBeFalse();
});

test('admins can open the dashboard', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertOk();
});

test('admins can create a room inside rooms3D', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/rooms', [
            'name' => '../../Pest Test Room',
            'file' => makeTourZip(),
            'cover' => UploadedFile::fake()->image('cover.jpg'),
        ])
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $room = Room::firstOrFail();

    expect($room->image)->toBe('rooms3D/pest_test_room/index.htm')
        ->and(file_exists(public_path($room->image)))->toBeTrue()
        ->and(file_exists(public_path($room->cover)))->toBeTrue();
});

test('zip files containing executable or config files are rejected', function (string $fileName) {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/rooms', [
            'name' => 'Pest Test Room',
            'file' => makeTourZip([$fileName => '<?php echo "pwned";']),
            'cover' => UploadedFile::fake()->image('cover.jpg'),
        ])
        ->assertSessionHasErrors('file');

    expect(Room::count())->toBe(0)
        ->and(is_dir(public_path('rooms3D/pest_test_room')))->toBeFalse();
})->with([
    'shell.php',
    'lib/SHELL.PHTML',
    'image.php.jpg',
    '.htaccess',
    'sub/.user.ini',
]);

test('updating a room with an unsafe zip keeps the old tour intact', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->post('/rooms', [
        'name' => 'Pest Test Room',
        'file' => makeTourZip(),
        'cover' => UploadedFile::fake()->image('cover.jpg'),
    ]);
    $room = Room::firstOrFail();

    $this->actingAs($admin)
        ->post("/rooms/{$room->id}", [
            'name' => 'Pest Test Room',
            'file' => makeTourZip(['shell.php' => '<?php echo "pwned";']),
        ])
        ->assertSessionHasErrors('file');

    expect(file_exists(public_path($room->image)))->toBeTrue()
        ->and(file_exists(public_path('rooms3D/pest_test_room/shell.php')))->toBeFalse();
});

test('admins can delete a room and its folder', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->post('/rooms', [
        'name' => 'Pest Test Room',
        'file' => makeTourZip(),
        'cover' => UploadedFile::fake()->image('cover.jpg'),
    ]);

    $room = Room::firstOrFail();

    $this->actingAs($admin)
        ->delete("/rooms/{$room->id}")
        ->assertRedirect();

    expect(Room::count())->toBe(0)
        ->and(is_dir(public_path('rooms3D/pest_test_room')))->toBeFalse();
});

test('the make-admin command grants and revokes admin access', function () {
    $user = User::factory()->create(['email' => 'admin@example.com']);

    $this->artisan('user:make-admin admin@example.com')->assertSuccessful();
    expect($user->fresh()->is_admin)->toBeTrue();

    $this->artisan('user:make-admin admin@example.com --revoke')->assertSuccessful();
    expect($user->fresh()->is_admin)->toBeFalse();

    $this->artisan('user:make-admin missing@example.com --revoke')->assertFailed();
});

test('the make-admin command can create a new admin account', function () {
    $this->artisan('user:make-admin new@example.com --name="New Admin" --password=secret123')
        ->assertSuccessful();

    $user = User::where('email', 'new@example.com')->firstOrFail();
    expect($user->is_admin)->toBeTrue()
        ->and($user->name)->toBe('New Admin');

    $this->post('/login', ['email' => 'new@example.com', 'password' => 'secret123']);
    $this->assertAuthenticatedAs($user);
});

test('the make-admin command refuses a short password', function () {
    $this->artisan('user:make-admin new@example.com --name="New Admin" --password=short')
        ->assertFailed();

    expect(User::where('email', 'new@example.com')->exists())->toBeFalse();
});
