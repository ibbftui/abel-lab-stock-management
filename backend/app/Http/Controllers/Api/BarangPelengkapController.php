<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BarangPelengkap;
use App\Models\LogAktivitas;
use App\Models\User;
use Illuminate\Http\Request;

class BarangPelengkapController extends Controller
{
    public function index()
    {
        return BarangPelengkap::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([

            'nama_barang' => 'required',
            'jumlah' => 'required|integer',
            'satuan' => 'required',
            'user_id' => 'required|exists:users,id',

        ]);

        $barang = BarangPelengkap::create(
            $request->except('user_id')
        );

        $user = User::find($request->user_id);

        LogAktivitas::create([

            'aktivitas' => 'Tambah Data',

            'kategori' => 'Barang Pelengkap',

            'deskripsi' => 'Menambahkan barang ' . $barang->nama_barang,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return $barang;
    }

    public function show(BarangPelengkap $barang)
    {
        return $barang;
    }

    public function update(Request $request, BarangPelengkap $barang)
    {
        $request->validate([

            'nama_barang' => 'required',
            'jumlah' => 'required|integer',
            'satuan' => 'required',
            'user_id' => 'required|exists:users,id',

        ]);

        $barang->update(
            $request->except('user_id')
        );

        $user = User::find($request->user_id);

        LogAktivitas::create([

            'aktivitas' => 'Update Data',

            'kategori' => 'Barang Pelengkap',

            'deskripsi' => 'Mengubah barang ' . $barang->nama_barang,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return $barang;
    }

    public function destroy(Request $request, BarangPelengkap $barang)
    {
        $request->validate([

            'user_id' => 'required|exists:users,id',

        ]);

        $namaBarang = $barang->nama_barang;

        $user = User::find($request->user_id);

        $barang->delete();

        LogAktivitas::create([

            'aktivitas' => 'Hapus Data',

            'kategori' => 'Barang Pelengkap',

            'deskripsi' => 'Menghapus barang ' . $namaBarang,

            'pengguna' => $user->role,

            'status' => 'Berhasil',

        ]);

        return response()->json([
            'message' => 'Data berhasil dihapus.'
        ]);
    }
}