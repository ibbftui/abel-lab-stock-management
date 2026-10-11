# Lab Stock Management

Aplikasi web untuk mengelola stok alat, bahan, dan barang pelengkap di laboratorium.  
Project ini terdiri dari dua bagian utama: **backend** dan **frontend**.

## 📂 Struktur Project
- `backend/` → API server untuk manajemen data stok
- `frontend/` → UI aplikasi untuk pengguna lab

## ⚙️ Teknologi yang digunakan
- Backend: Laravel + PostgreSQL
- Frontend: React
- Deployment: satu proyek Vercel dari root repository

## 🚀 Cara Menjalankan
### Backend
```bash
cd backend
composer install
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Panduan deploy ada di [DEPLOY.md](./DEPLOY.md).
