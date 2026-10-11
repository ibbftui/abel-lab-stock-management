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
4. Tambahkan environment variables berikut untuk environment yang akan digunakan (Production dan Preview bila diperlukan):

| Variable | Value |
|---|---|
| `APP_NAME` | `Laboratorium IBB` |
| `APP_ENV` | `production` |
| `APP_KEY` | Hasil `php artisan key:generate --show` |
| `APP_DEBUG` | `false` |
| `APP_URL` | URL proyek Vercel, misalnya `https://nama-proyek.vercel.app` |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | Host PostgreSQL dari provider |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | Nama database |
| `DB_USERNAME` | Username database |
| `DB_PASSWORD` | Password database |
| `DB_SSLMODE` | `require` |
| `CI` | `false` |
| `GENERATE_SOURCEMAP` | `false` |

Simpan rahasia seperti `APP_KEY` dan `DB_PASSWORD` hanya di Vercel Environment Variables, jangan di-commit ke repository. `APP_URL` harus memakai URL deployment yang sebenarnya.

Setelah mengatur variabel, klik **Deploy**. Perubahan source code berikutnya cukup di-push ke repository; Vercel akan membangun dan menerbitkan frontend serta API bersama-sama.

## Konfigurasi yang sudah disiapkan

- Frontend dilayani pada URL proyek Vercel.
- Endpoint Laravel tetap tersedia pada URL yang sama dengan prefix `/api`.
- Frontend memakai `/api` secara otomatis di production. Jangan isi `REACT_APP_API_URL` dengan URL backend terpisah.
- Pengaturan cache sementara, session, dan runtime Laravel sudah ada di `vercel.json`.
- Karena frontend memanggil API pada origin yang sama, tidak perlu mengatur CORS ke URL proyek frontend yang terpisah.

## Verifikasi

- Buka URL proyek Vercel; halaman login frontend seharusnya tampil.
- Buka `https://nama-proyek.vercel.app/api/dashboard`; endpoint seharusnya merespons JSON. Pastikan database sudah memiliki schema aplikasi.
