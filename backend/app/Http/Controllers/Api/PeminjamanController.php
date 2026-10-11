<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use App\Models\LogAktivitas;
use App\Models\User;
use Illuminate\Http\Request;

class PeminjamanController extends Controller
{
    // Menampilkan semua data
    public function index()
    {
        return Peminjaman::with('user')->latest()->get();
    }

    // Menambah data
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_peminjam' => 'required',
            'nim' => 'required',
            'institusi' => 'required',
            'barang' => 'required',
            'spesifikasi' => 'nullable|string',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pinjam' => 'required|date',
            'tanggal_kembali' => 'required|date',
            'status' => 'required',
            'catatan' => 'nullable',
            'user_id' => 'required|exists:users,id',
        ]);

        $peminjaman = Peminjaman::create($validated);

        $user = User::findOrFail($validated['user_id']);

        LogAktivitas::create([
            'aktivitas' => 'Tambah Data',
            'kategori' => 'Peminjaman',
            'deskripsi' => 'Menambahkan peminjaman ' . $peminjaman->nama_peminjam,
            'pengguna' => $user->role,
            'status' => 'Berhasil',
        ]);

        return response()->json([
            'message' => 'Data peminjaman berhasil ditambahkan',
            'data' => $peminjaman
        ], 201);
    }

    // Menampilkan satu data
    public function show(Peminjaman $peminjaman)
    {
        return $peminjaman;
    }

    // Update data
    public function update(Request $request, Peminjaman $peminjaman)
    {
        $validated = $request->validate([
            'nama_peminjam' => 'required',
            'nim' => 'required',
            'institusi' => 'required',
            'barang' => 'required',
            'spesifikasi' => 'nullable|string',
            'jumlah' => 'required|integer|min:1',
            'tanggal_pinjam' => 'required|date',
            'tanggal_kembali' => 'required|date',
            'status' => 'required',
            'catatan' => 'nullable',
            'user_id' => 'required|exists:users,id',
        ]);

        $peminjaman->update($validated);

        $user = User::findOrFail($validated['user_id']);

        LogAktivitas::create([
            'aktivitas' => 'Update Data',
            'kategori' => 'Peminjaman',
            'deskripsi' => 'Mengubah data peminjaman ' . $peminjaman->nama_peminjam,
            'pengguna' => $user->role,
            'status' => 'Berhasil',
        ]);

        return response()->json([
            'message' => 'Data peminjaman berhasil diupdate',
            'data' => $peminjaman
        ]);
    }

    // Hapus data
    public function destroy(Request $request, $id)
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'message' => 'Peminjaman tidak ditemukan.'
            ], 404);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);

        $nama = $peminjaman->nama_peminjam;

        $peminjaman->delete();

        LogAktivitas::create([
            'aktivitas' => 'Hapus Data',
            'kategori' => 'Peminjaman',
            'deskripsi' => 'Menghapus data peminjaman ' . $nama,
            'pengguna' => $user->role,
            'status' => 'Berhasil',
        ]);

        return response()->json([
            'message' => 'Data peminjaman berhasil dihapus.'
        ]);
    }
}