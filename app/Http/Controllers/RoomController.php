<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::all();
        $rooms->each(function ($room) {
            $room->image = '/' . $room->image;
            $room->cover = '/' . $room->cover;
        });
        return Inertia::render('Rooms', [
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:zip'], // Only ZIP files
            'cover' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:5120'], // Only image files
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        // Generate folder name based on room name
        $roomFolder = 'rooms3D/' . str_replace(' ', '_', strtolower($request->name));
        $storagePath = public_path($roomFolder);

        // Ensure directory exists
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        // Handle ZIP file
        if ($request->hasFile('file')) {
            $zipFileName = time() . '_' . $request->file('file')->getClientOriginalName();
            $zipFilePath = $storagePath . '/' . $zipFileName;
            $request->file('file')->move($storagePath, $zipFileName);

            // Extract ZIP file
            $zip = new ZipArchive;
            if ($zip->open($zipFilePath) === TRUE) {
                $zip->extractTo($storagePath);
                $zip->close();
            } else {
                return redirect()->back()->with('error', 'Failed to unzip the file.');
            }

            // Set correct file path
            $imagePath = $roomFolder . '/index.htm';
        }

        // Handle Cover Image
        $coverPath = null;
        if ($request->hasFile('cover')) {
            // Define the correct cover path
            $coverFileName = time() . '_' . $request->file('cover')->getClientOriginalName();
            $coverFolderPath = $roomFolder . '/cover/';
            $coverStoragePath = public_path($coverFolderPath . $coverFileName);

            // Ensure cover directory exists
            if (!file_exists(public_path($coverFolderPath))) {
                mkdir(public_path($coverFolderPath), 0777, true);
            }

            // Move the cover file to the correct folder
            $request->file('cover')->move(public_path($coverFolderPath), $coverFileName);

            // Save relative path (NOT temporary path)
            $coverPath = $coverFolderPath . $coverFileName;
        }

        // Save the room in the database with the correct paths
        Room::create([
            'name' => $request->name,
            'image' => $imagePath ?? null,
            'cover' => $coverPath ?? null,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Room created successfully with cover image!');
    }

    public function show(Request $request, Room $room)
    {
        $rooms = Room::all();
        return Inertia::render('Rooms/Show', [
            'room' => $room,
            'rooms' => $rooms,
            'image' => '/' . $room->image,
            'cover' => '/' . $room->cover,
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $request->validate([
            'name' => 'required',
            'file' => ['nullable', 'file', 'mimes:zip'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:5120'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        // Generate folder name based on the updated room name
        $roomFolder = 'rooms3D/' . str_replace(' ', '_', strtolower($request->name));
        $storagePath = public_path($roomFolder);

        // Ensure the directory exists
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0777, true);
        }

        // ✅ Handle ZIP file update
        if ($request->hasFile('file')) {
            // Delete old ZIP file if it exists
            if (!empty($room->image) && file_exists(public_path($room->image))) {
                unlink(public_path($room->image));
            }

            $zipFileName = time() . '_' . $request->file('file')->getClientOriginalName();
            $zipFilePath = $storagePath . '/' . $zipFileName;
            $request->file('file')->move($storagePath, $zipFileName);

            $zip = new ZipArchive;
            if ($zip->open($zipFilePath) === TRUE) {
                $zip->extractTo($storagePath);
                $zip->close();
            } else {
                return redirect()->back()->with('error', 'Failed to unzip the new file.');
            }

            // Update the image field in the database
            $room->image = $roomFolder . '/index.htm';
        }
        // dd($request->hasFile('cover'));
        // ✅ Handle Cover Image Update
        if ($request->hasFile('cover')) {
            // Delete old cover if it exists
            if (!empty($room->cover) && file_exists(public_path($room->cover))) {
                unlink(public_path($room->cover));
            }

            // Define new cover file path
            $coverFileName = time() . '_' . $request->file('cover')->getClientOriginalName();
            $coverFolderPath = $roomFolder . '/cover/';
            $coverStoragePath = public_path($coverFolderPath . $coverFileName);

            // Ensure cover directory exists
            if (!file_exists(public_path($coverFolderPath))) {
                mkdir(public_path($coverFolderPath), 0777, true);
            }

            // Move the new cover file
            $request->file('cover')->move(public_path($coverFolderPath), $coverFileName);

            // ✅ Save the new cover path in the database
            $room->cover = $coverFolderPath . $coverFileName;
        }

        // ✅ Update room details
        $room->name = $request->name;
        $room->description = $request->description;

        // ✅ Save changes to the database
        $room->save();

        return redirect()->back()->with('success', 'Room updated successfully!');
    }

    public function destroy(Room $room)
    {
        $roomFolder = public_path('rooms3D/' . str_replace(' ', '_', strtolower($room->name)));

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

    // Helper function to delete a folder and its contents
    private function deleteFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            return;
        }

        $files = array_diff(scandir($folderPath), ['.', '..']);
        foreach ($files as $file) {
            $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;
            is_dir($filePath) ? $this->deleteFolder($filePath) : unlink($filePath);
        }
        rmdir($folderPath);
    }
}
