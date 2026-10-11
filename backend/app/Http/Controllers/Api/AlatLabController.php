<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AlatLab;
use App\Models\LogAktivitas;
use App\Models\User;
use Illuminate\Http\Request;

class AlatLabController extends Controller
{
    // Menampilkan semua data
    public function index()
    {
        $alat = AlatLab::orderBy('id', 'desc')->get();

        return response()->json($alat);
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_alat' => 'required',
            'jumlah' => 'required|integer',
            'satuan' => 'required',
            'lokasi' => 'required',
            'kondisi' => 'required',
            'status' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $alat = AlatLab::create(
            $request->except('user_id')
        );

        $user = User::find($request->user_id);

        LogAktivitas::create([

            'aktivitas' => 'Tambah Data',

            'kategori' => 'Data Alat',

            'deskripsi' => 'Menambahkan alat ' . $alat->nama_alat,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $alat
        ], 201);
    }

    // Menampilkan satu data
    public function show($id)
    {
        $alat = AlatLab::findOrFail($id);

        return response()->json($alat);
    }

    // Update data
    public function update(Request $request, $id)
    {
        $alat = AlatLab::findOrFail($id);

        $request->validate([
            'nama_alat' => 'required',
            'jumlah' => 'required|integer',
            'satuan' => 'required',
            'lokasi' => 'required',
            'kondisi' => 'required',
            'status' => 'required',
            'user_id' => 'required|exists:users,id',
        ]);

        $alat->update(
            $request->except('user_id')
        );

        $user = User::find($request->user_id);

        LogAktivitas::create([

            'aktivitas' => 'Update Data',

            'kategori' => 'Data Alat',

            'deskripsi' => 'Mengubah alat ' . $alat->nama_alat,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $alat
        ]);
    }

    // Hapus data
    public function destroy(Request $request, $id)
    {
        $alat = AlatLab::findOrFail($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $namaAlat = $alat->nama_alat;

        $user = User::find($request->user_id);

        $alat->delete();

        LogAktivitas::create([

            'aktivitas' => 'Hapus Data',

            'kategori' => 'Data Alat',

            'deskripsi' => 'Menghapus alat ' . $namaAlat,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}