<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BahanKimia;
use App\Models\LogAktivitas;
use App\Models\User;
use Illuminate\Http\Request;

class BahanKimiaController extends Controller
{
    public function index()
    {
        return BahanKimia::latest()->get();
    }

    public function store(Request $request)
{
    $request->validate([
        'nama_bahan' => 'required',
        'merk' => 'nullable',
        'tanggal_kadaluarsa' => 'required',
        'keterangan' => 'nullable',
        'jumlah' => 'required',
        'satuan' => 'required',
        'user_id' => 'required|exists:users,id',
    ]);

    $bahan = BahanKimia::create(
        $request->except('user_id')
    );

    $user = User::find($request->user_id);

    LogAktivitas::create([
        'aktivitas' => 'Tambah Data',
        'kategori' => 'Data Bahan',
        'deskripsi' => 'Menambahkan bahan ' . $bahan->nama_bahan,
        'pengguna' => $user->role,
        'status' => 'Berhasil',
    ]);

    return $bahan;
}

    public function show(BahanKimia $bahan)
    {
        return $bahan;
    }

    public function update(Request $request, BahanKimia $bahan)
{
    $request->validate([
        'nama_bahan' => 'required',
        'merk' => 'nullable',
        'tanggal_kadaluarsa' => 'required',
        'keterangan' => 'nullable',
        'jumlah' => 'required',
        'satuan' => 'required',
        'user_id' => 'required|exists:users,id',
    ]);

    $bahan->update(
        $request->except('user_id')
    );

    $user = User::find($request->user_id);

    LogAktivitas::create([
        'aktivitas' => 'Update Data',
        'kategori' => 'Data Bahan',
        'deskripsi' => 'Mengubah bahan ' . $bahan->nama_bahan,
        'pengguna' => $user->role,
        'status' => 'Berhasil',
    ]);

    return $bahan;
}

    public function destroy(Request $request, BahanKimia $bahan)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
    ]);

    $namaBahan = $bahan->nama_bahan;

    $user = User::find($request->user_id);

    $bahan->delete();

    LogAktivitas::create([
        'aktivitas' => 'Hapus Data',
        'kategori' => 'Data Bahan',
        'deskripsi' => 'Menghapus bahan ' . $namaBahan,
        'pengguna' => $user->role,
        'status' => 'Berhasil',
    ]);

    return response()->json([
        'message' => 'Data berhasil dihapus.'
    ]);
    }
}