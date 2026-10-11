# Deploy Lab Stock Management ke Vercel

Frontend React dan backend Laravel dideploy sebagai **satu proyek Vercel** dari root repository. File [vercel.json](./vercel.json) membangun frontend dan mengarahkan `/api/*` ke backend; [composer.json](./composer.json) memasang dependency Laravel dari folder `backend/`.

## 1. Siapkan database dan APP_KEY

Siapkan database PostgreSQL yang bisa diakses dari internet (misalnya Neon), lalu catat host, nama database, username, password, dan mode SSL dari provider.

Buat `APP_KEY` di komputer lokal:

```bash
cd backend
php artisan key:generate --show
```

## 2. Buat satu proyek Vercel

1. Di Vercel, pilih **Add New Project** lalu import repository ini.
2. Biarkan **Root Directory** di root repository (`./`), jangan pilih `frontend/` atau `backend/`.
3. Di **Settings → Build and Deployment → Node.js Version**, pilih **22.x**. Runtime PHP yang digunakan aplikasi (`vercel-php@0.9.0`) mensyaratkan Node.js 22.
4. Biarkan konfigurasi build mengikuti `vercel.json` di repository.
5. Untuk memasukkan environment variables sekaligus, buka **Settings → Environment Variables → Bulk Edit** dan paste isi file `backend/.env.vercel`. File tersebut dibuat lokal dari konfigurasi di `backend/.env` dan tidak masuk Git.
6. Ganti nilai `APP_URL` di file itu dengan URL proyek Vercel yang sebenarnya, lalu pilih environment yang akan digunakan (Production dan Preview bila diperlukan).

File impor berisi rahasia database dan `APP_KEY`. Jangan commit atau bagikan file itu; rahasia hanya akan dimasukkan ke Vercel saat kamu paste. Setelah mengatur variabel, klik **Deploy**. Perubahan source code berikutnya cukup di-push ke repository; Vercel akan membangun dan menerbitkan frontend serta API bersama-sama.

## 3. Inisialisasi database production

Deployment tidak menjalankan migrasi atau seeder otomatis. Untuk membuat tabel dan akun awal, jalankan sekali dari komputer lokal setelah menghubungkan Vercel CLI ke proyek yang benar:

```bash
vercel env pull backend/.env.production --environment=production
cd backend
php artisan migrate --seed --force --env=production
```

Perintah tersebut memakai environment variables Production dari Vercel, termasuk kredensial database. Jalankan hanya jika `DB_HOST` dan `DB_DATABASE` mengarah ke database production yang benar. Seeder membuat akun `admin` dan `kepala` dengan password awal `password`; seeder juga mengatur ulang password akun tersebut jika dijalankan lagi. Ganti password awal melalui pengelolaan database sebelum aplikasi digunakan.

## Konfigurasi yang sudah disiapkan

- Frontend dilayani pada URL proyek Vercel.
- Endpoint Laravel tetap tersedia pada URL yang sama dengan prefix `/api`.
- Frontend memakai `/api` secara otomatis di production. Jangan isi `REACT_APP_API_URL` dengan URL backend terpisah.
- Path cache `/tmp` Laravel baru diatur saat API dijalankan. Script build menghapus override path cache dari environment Vercel, sehingga Composer memakai folder `backend/bootstrap/cache` di repository dan tidak bergantung pada folder `/tmp` yang belum tersedia.
- Karena frontend memanggil API pada origin yang sama, tidak perlu mengatur CORS ke URL proyek frontend yang terpisah.

## Verifikasi

- Buka URL proyek Vercel; halaman login frontend seharusnya tampil.
- Buka `https://nama-proyek.vercel.app/api/dashboard`; endpoint seharusnya merespons JSON setelah database diinisialisasi.
