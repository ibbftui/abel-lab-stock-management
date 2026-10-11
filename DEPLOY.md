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
3. Biarkan konfigurasi build mengikuti `vercel.json` di repository.
4. Untuk memasukkan environment variables sekaligus, buka **Settings → Environment Variables → Bulk Edit** dan paste isi file `backend/.env.vercel`. File tersebut dibuat lokal dari konfigurasi di `backend/.env` dan tidak masuk Git.
5. Ganti nilai `APP_URL` di file itu dengan URL proyek Vercel yang sebenarnya, lalu pilih environment yang akan digunakan (Production dan Preview bila diperlukan).

File impor berisi rahasia database dan `APP_KEY`. Jangan commit atau bagikan file itu; rahasia hanya akan dimasukkan ke Vercel saat kamu paste. Setelah mengatur variabel, klik **Deploy**. Perubahan source code berikutnya cukup di-push ke repository; Vercel akan membangun dan menerbitkan frontend serta API bersama-sama.

## Konfigurasi yang sudah disiapkan

- Frontend dilayani pada URL proyek Vercel.
- Endpoint Laravel tetap tersedia pada URL yang sama dengan prefix `/api`.
- Frontend memakai `/api` secara otomatis di production. Jangan isi `REACT_APP_API_URL` dengan URL backend terpisah.
- Pengaturan cache sementara, session, dan runtime Laravel sudah ada di `vercel.json`.
- Karena frontend memanggil API pada origin yang sama, tidak perlu mengatur CORS ke URL proyek frontend yang terpisah.

## Verifikasi

- Buka URL proyek Vercel; halaman login frontend seharusnya tampil.
- Buka `https://nama-proyek.vercel.app/api/dashboard`; endpoint seharusnya merespons JSON. Pastikan database sudah memiliki schema aplikasi.
