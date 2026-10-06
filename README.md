# Virtual Tour 360 — Teknik Informatika UIR

Website virtual tour 360° Prodi Teknik Informatika, Fakultas Teknik, Universitas Islam Riau.
Dibangun dengan Laravel 11, Inertia, dan React.

## Menjalankan di komputer lokal

```bash
composer install
npm install
cp .env.example .env        # lalu isi pengaturan database
php artisan key:generate
php artisan migrate
php artisan serve           # terminal 1
npm run dev                 # terminal 2
```

Buka `http://localhost:8000`.

## Akun admin

Pendaftaran akun publik ditutup. Hanya admin yang bisa membuka Dashboard dan mengelola ruangan.

```bash
# Membuat akun admin baru (akan ditanya nama dan password),
# atau menjadikan akun yang sudah ada sebagai admin
php artisan user:make-admin email@contoh.com

# Mencabut akses admin
php artisan user:make-admin email@contoh.com --revoke
```

Lupa password? Gunakan menu "Forgot password" di halaman login (email harus sudah diatur di `.env`), atau:

```bash
php artisan tinker --execute="App\Models\User::where('email','email@contoh.com')->update(['password'=>bcrypt('PasswordBaru')]);"
```

## Mengelola ruangan

- Tambah ruangan dari Dashboard: isi nama, upload ZIP hasil export 3DVista (berisi `index.htm`), dan foto cover.
- ZIP maksimal 200 MB (maksimal 1 GB setelah diekstrak). ZIP yang berisi file yang bisa dijalankan server
  (`.php`, `.phtml`, `.htaccess`, dan sejenisnya) akan ditolak.
- Urutan ruangan di halaman pengunjung diatur dengan tombol panah di Dashboard.
- Folder tour di `public/rooms3D` yang belum terdaftar di database bisa didaftarkan dengan:

```bash
php artisan rooms:import
```

## Menjalankan test

Test memakai database terpisah (`virtaltour360_test`, diatur di `.env.testing`) karena test mengosongkan database.
Buat database itu sekali, lalu:

```bash
php artisan test
```

Jangan arahkan `.env.testing` ke database utama.

## Checklist sebelum website online

Ubah di `.env` server:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda
```

Lalu jalankan:

```bash
composer install --no-dev --optimize-autoloader
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Catatan:
- Arahkan document root web server ke folder `public/`, bukan ke root proyek.
- Pastikan `upload_max_filesize` dan `post_max_size` di PHP minimal 200M agar upload tour berfungsi.
- Gunakan password database yang kuat (jangan `root` tanpa password).
