<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AlatLabController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BahanKimiaController;
use App\Http\Controllers\Api\BarangPelengkapController;
use App\Http\Controllers\Api\LogAktivitasController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\NotifikasiController;
use App\Http\Controllers\Api\PeminjamanController;

Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('alat', AlatLabController::class);
Route::apiResource('bahan', BahanKimiaController::class);
Route::apiResource('barang', BarangPelengkapController::class);
Route::apiResource('log-aktivitas', LogAktivitasController::class);
Route::apiResource('peminjaman', PeminjamanController::class);

Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/notifikasi', [NotifikasiController::class, 'index']);