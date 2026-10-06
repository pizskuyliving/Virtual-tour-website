<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Str;
use ZipArchive;

class RoomController extends Controller
{
    // Maximum uploaded ZIP size in kilobytes (200 MB)
    private const MAX_ZIP_KB = 204800;

    // Maximum total size of the extracted tour in bytes (1 GB), guards against zip bombs
    private const MAX_EXTRACTED_BYTES = 1024 * 1024 * 1024;

    // File types the web server could execute or that change server config
    private const BLOCKED_EXTENSIONS = [
        'php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'pht', 'phps', 'phar',
        'cgi', 'pl', 'py', 'sh', 'asp', 'aspx', 'jsp', 'shtml', 'exe', 'bat', 'cmd',
    ];

    public function index()
    {
        $rooms = Room::ordered()->get();
        $rooms->each(function ($room) {
            $room->image = '/' . $room->image;
            $room->cover = '/' . $room->cover;
        });
        return Inertia::render('RoomsHome', [
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:zip', 'max:' . self::MAX_ZIP_KB], // Only ZIP files
            'cover' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:5120'], // Only image files
        ]);

        // Reject unsafe ZIP contents before anything is written to public/
        if ($error = $this->checkTourZip($request->file('file')->getRealPath())) {
            return redirect()->back()->withErrors(['file' => $error]);
        }

        // Generate folder name based on room name
        $roomFolder = $this->roomFolder($request->name);
        if ($this->folderIsUsed($roomFolder)) {
            return redirect()->back()->withErrors(['name' => 'Nama ruangan ini sudah dipakai ruangan lain.']);
        }

        if (!$this->extractTour($request->file('file'), public_path($roomFolder))) {
            return redirect()->back()->withErrors(['file' => 'Gagal mengekstrak file ZIP.']);
        }

        Room::create([
            'name' => $request->name,
            'image' => $roomFolder . '/index.htm',
            'cover' => $this->storeCover($request->file('cover'), $roomFolder),
            'sort_order' => (Room::max('sort_order') ?? 0) + 1,
        ]);

        return redirect()->back()->with('success', 'Room created successfully with cover image!');
    }

    public function show(Room $room)
    {
        return Inertia::render('Rooms/Show', [
            'room' => $room,
            'image' => '/' . $room->image,
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'mimes:zip', 'max:' . self::MAX_ZIP_KB],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:5120'],
        ]);

        // Reject unsafe ZIP contents before the old tour is touched
        if ($request->hasFile('file') && $error = $this->checkTourZip($request->file('file')->getRealPath())) {
            return redirect()->back()->withErrors(['file' => $error]);
        }

        $oldFolder = $this->folderOf($room);
        $roomFolder = $this->roomFolder($request->name);

        // Renamed room: move its folder so no old folder is left behind
        if ($roomFolder !== $oldFolder) {
            if ($this->folderIsUsed($roomFolder, $room) || is_dir(public_path($roomFolder))) {
                return redirect()->back()->withErrors(['name' => 'Nama ruangan ini sudah dipakai ruangan lain.']);
            }

            if (is_dir(public_path($oldFolder)) && !$this->moveFolder(public_path($oldFolder), public_path($roomFolder))) {
                return redirect()->back()->withErrors(['name' => 'Gagal memindahkan folder ruangan. Coba lagi.']);
            }

            $room->image = $roomFolder . '/' . Str::after($room->image, $oldFolder . '/');
            if (!empty($room->cover) && Str::startsWith($room->cover, $oldFolder . '/')) {
                $room->cover = $roomFolder . '/' . Str::after($room->cover, $oldFolder . '/');
            }
        }

        if ($request->hasFile('file')) {
            // Replace the old tour files, keeping the cover folder
            $this->clearFolder(public_path($roomFolder), ['cover']);

            if (!$this->extractTour($request->file('file'), public_path($roomFolder))) {
                return redirect()->back()->withErrors(['file' => 'Gagal mengekstrak file ZIP.']);
            }

            $room->image = $roomFolder . '/index.htm';
        }

        if ($request->hasFile('cover')) {
            // Delete old cover if it exists
            if (!empty($room->cover) && file_exists(public_path($room->cover))) {
                unlink(public_path($room->cover));
            }

            $room->cover = $this->storeCover($request->file('cover'), $roomFolder);
        }

        $room->name = $request->name;
        $room->save();

        return redirect()->back()->with('success', 'Room updated successfully!');
    }

    // Move a room one position up or down in the list shown to visitors
    public function move(Request $request, Room $room)
    {
        $request->validate([
            'direction' => ['required', 'in:up,down'],
        ]);

        $rooms = Room::ordered()->get()->values();
        $index = $rooms->search(fn ($item) => $item->id === $room->id);
        $target = $request->direction === 'up' ? $index - 1 : $index + 1;

        if ($target >= 0 && $target < $rooms->count()) {
            $moved = $rooms->splice($index, 1)->first();
            $rooms->splice($target, 0, [$moved]);
        }

        // Renumber so every room has a unique position
        $rooms->values()->each(function ($item, $position) {
            if ($item->sort_order !== $position + 1) {
                $item->update(['sort_order' => $position + 1]);
            }
        });

        return redirect()->back();
    }

    public function destroy(Room $room)
    {
        $roomFolder = public_path($this->folderOf($room));

        // Delete cover image if it exists
        if (isset($room->cover) && file_exists(public_path($room->cover))) {
            unlink(public_path($room->cover));
        }

        // Delete entire room folder
        if (is_dir($roomFolder)) {
            $this->deleteFolder($roomFolder);
        }

        // Delete the room from the database
        $room->delete();

        return redirect()->back()->with('success', 'Room deleted successfully!');
    }

    // Returns an error message when the ZIP contains unsafe entries, or null when it is safe to extract
    private function checkTourZip(string $zipPath): ?string
    {
        $zip = new ZipArchive;
        if ($zip->open($zipPath) !== true) {
            return 'File ZIP tidak dapat dibaca.';
        }

        $totalSize = 0;
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $stat = $zip->statIndex($i);
            $name = str_replace('\\', '/', $stat['name']);
            $baseName = strtolower(basename($name));
            $extension = strtolower(pathinfo($baseName, PATHINFO_EXTENSION));
            $totalSize += $stat['size'];

            if (Str::startsWith($name, '/') || preg_match('#(^|/)\.\.(/|$)#', $name) || preg_match('#^[a-zA-Z]:#', $name)) {
                $zip->close();
                return "File ZIP berisi path yang tidak valid: {$stat['name']}";
            }

            // Also catch double extensions such as shell.php.jpg, which some servers execute
            $parts = explode('.', $baseName);
            array_shift($parts);
            if (
                in_array($baseName, ['.htaccess', '.user.ini', 'web.config'], true)
                || in_array($extension, self::BLOCKED_EXTENSIONS, true)
                || array_intersect($parts, self::BLOCKED_EXTENSIONS)
            ) {
                $zip->close();
                return "File ZIP berisi jenis file yang tidak diizinkan: {$stat['name']}";
            }
        }
        $zip->close();

        if ($totalSize > self::MAX_EXTRACTED_BYTES) {
            return 'Isi file ZIP terlalu besar (maksimal 1 GB setelah diekstrak).';
        }

        return null;
    }

    // Extract the uploaded tour straight from the temporary upload, so the ZIP itself is not kept in public/
    private function extractTour(UploadedFile $file, string $destination): bool
    {
        if (!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        $zip = new ZipArchive;
        if ($zip->open($file->getRealPath()) !== true) {
            return false;
        }
        $extracted = $zip->extractTo($destination);
        $zip->close();

        return $extracted;
    }

    // Save the cover under a generated name and return its public path
    private function storeCover(UploadedFile $file, string $roomFolder): string
    {
        $coverFolderPath = $roomFolder . '/cover/';
        $coverFileName = time() . '_' . Str::random(8) . '.' . $file->guessExtension();

        if (!is_dir(public_path($coverFolderPath))) {
            mkdir(public_path($coverFolderPath), 0755, true);
        }

        $file->move(public_path($coverFolderPath), $coverFileName);

        return $coverFolderPath . $coverFileName;
    }

    // Build a safe folder name from the room name (prevents path traversal like "../")
    private function roomFolder(string $name): string
    {
        return 'rooms3D/' . (Str::slug($name, '_') ?: 'room');
    }

    // The folder a room is actually stored in (it may differ from its current name)
    private function folderOf(Room $room): string
    {
        return !empty($room->image) && Str::startsWith($room->image, 'rooms3D/') && dirname($room->image) !== 'rooms3D'
            ? dirname($room->image)
            : $this->roomFolder($room->name);
    }

    // Whether another room already stores its tour in this folder
    private function folderIsUsed(string $folder, ?Room $except = null): bool
    {
        return Room::query()
            ->when($except, fn ($query) => $query->whereKeyNot($except->getKey()))
            ->where('image', 'like', addcslashes($folder, '\\%_') . '/%')
            ->exists();
    }

    // Move a folder; on Windows rename() fails while another program has a file open, so fall back to copy + delete
    private function moveFolder(string $from, string $to): bool
    {
        if (@rename($from, $to)) {
            return true;
        }

        if (!File::copyDirectory($from, $to)) {
            File::deleteDirectory($to);
            return false;
        }

        File::deleteDirectory($from);

        return true;
    }

    // Delete everything inside a folder except the given entries
    private function clearFolder(string $folderPath, array $keep = []): void
    {
        if (!is_dir($folderPath)) {
            return;
        }

        foreach (array_diff(scandir($folderPath), ['.', '..'], $keep) as $file) {
            $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
            is_dir($filePath) ? $this->deleteFolder($filePath) : unlink($filePath);
        }
    }

    // Helper function to delete a folder and its contents
    private function deleteFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            return;
        }

        $this->clearFolder($folderPath);
        rmdir($folderPath);
    }
}
