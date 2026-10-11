# Lab Stock Management - Panduan Deploy ke Vercel

Panduan ini menjelaskan cara deploy **backend (Laravel)** dan **frontend (React)** secara terpisah ke Vercel.

---

## ⚡ Strategi Deploy

Project ini di-deploy sebagai **dua proyek Vercel terpisah**:
1. **Backend** → Deploy folder `backend/` → menghasilkan URL misal: `https://lab-backend.vercel.app`  
2. **Frontend** → Deploy folder `frontend/` → menghasilkan URL misal: `https://lab-frontend.vercel.app`

---

## 🚀 Langkah Deploy Backend (Laravel)

### 1. Import ke Vercel
- Buka [vercel.com](https://vercel.com) → **Add New Project**
- Import repository GitHub Anda
- Saat konfigurasi, set **Root Directory** ke: `backend`
- **Framework Preset**: `Other`
- **Build Command**: *(kosongkan)*
- **Output Directory**: *(kosongkan)*

### 2. Konfigurasi Environment Variables di Vercel Dashboard

Tambahkan **semua** variabel berikut di menu **Settings → Environment Variables** pada project backend:

| Key | Value |
|-----|-------|
| `APP_NAME` | `Laboratorium IBB` |
| `APP_ENV` | `production` |
| `APP_KEY` | *(jalankan `php artisan key:generate --show` di lokal)* |
| `APP_DEBUG` | `false` |
| `APP_URL` | `https://your-backend.vercel.app` |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | `host pgsql` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `pgsqluser` |
| `DB_USERNAME` | `pgsqluser` |
| `DB_PASSWORD` | `pgsqlpassword` |
| `DB_SSLMODE` | `require` |
| `SESSION_DRIVER` | `cookie` |
| `CACHE_STORE` | `array` |
| `LOG_CHANNEL` | `stderr` |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` |
| `VIEW_COMPILED_PATH` | `/tmp/storage/framework/views` |
| `APP_CONFIG_CACHE` | `/tmp/bootstrap/cache/config.php` |
| `APP_ROUTES_CACHE` | `/tmp/bootstrap/cache/routes.php` |
| `APP_PACKAGES_CACHE` | `/tmp/bootstrap/cache/packages.php` |
| `APP_SERVICES_CACHE` | `/tmp/bootstrap/cache/services.php` |
| `APP_EVENTS_CACHE` | `/tmp/bootstrap/cache/events.php` |

> ⚠️ **Setelah tau URL backend**, update `CORS_ALLOWED_ORIGINS` dengan URL frontend yang sesungguhnya.

---

## 🚀 Langkah Deploy Frontend (React)

### 1. Import ke Vercel
- Buka [vercel.com](https://vercel.com) → **Add New Project**
- Import repository GitHub yang sama
- Saat konfigurasi, set **Root Directory** ke: `frontend`
- **Framework Preset**: `Create React App`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 2. Konfigurasi Environment Variables

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://your-backend.vercel.app/api` |
| `CI` | `false` |
| `GENERATE_SOURCEMAP` | `false` |

> Ganti `your-backend.vercel.app` dengan URL backend yang sudah dideploy.

---

## 🔑 Generate APP_KEY

Jalankan command ini di lokal untuk mendapatkan nilai `APP_KEY`:
```bash
cd backend
php artisan key:generate --show
```

---

## 📋 Urutan Deploy

1. Deploy **backend** terlebih dahulu
2. Catat URL backend yang dihasilkan (misal: `https://lab-backend.vercel.app`)
3. Kembali ke dashboard backend → update `CORS_ALLOWED_ORIGINS` dengan URL frontend (setelah step 4)
4. Deploy **frontend** dengan `REACT_APP_API_URL` menggunakan URL backend dari step 2
5. Catat URL frontend, update `CORS_ALLOWED_ORIGINS` di backend

---

## ✅ Verifikasi

- Buka `https://your-backend.vercel.app/api/dashboard` → harus mengembalikan JSON
- Buka `https://your-frontend.vercel.app` → harus menampilkan halaman login
- Login menggunakan: `admin` / `password`
