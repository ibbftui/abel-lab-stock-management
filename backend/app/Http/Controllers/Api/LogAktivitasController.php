<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LogAktivitas;
use Illuminate\Http\Request;

class LogAktivitasController extends Controller
{
    public function index()
    {
        return LogAktivitas::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([

            'aktivitas' => 'required',

            'kategori' => 'required',

            'deskripsi' => 'required',

            'pengguna' => 'required',

        ]);

        return LogAktivitas::create($request->all());
    }

    public function show(LogAktivitas $logAktivita)
    {
        return $logAktivita;
    }

    public function update(Request $request, LogAktivitas $logAktivita)
    {
        $request->validate([

            'aktivitas' => 'required',

            'kategori' => 'required',

            'deskripsi' => 'required',

            'pengguna' => 'required',

            'status' => 'required',

        ]);

        $logAktivita->update($request->all());

        return $logAktivita;
    }

    public function destroy(LogAktivitas $logAktivita)
    {
        $logAktivita->delete();

        return response()->json([
            'message' => 'Log aktivitas berhasil dihapus.'
        ]);
    }
}