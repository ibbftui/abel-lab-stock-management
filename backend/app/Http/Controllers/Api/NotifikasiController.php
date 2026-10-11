<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BahanKimia;
use Carbon\Carbon;

class NotifikasiController extends Controller
{
    public function index()
    {
        $bahan = BahanKimia::all();

        $data = [];

        $kadaluarsa = 0;
        $mendekati = 0;
        $aman = 0;

        $hariIni = Carbon::today();

        // Batas H-90 dan H-60
        $h90 = $hariIni->copy()->addDays(90);
        $h60 = $hariIni->copy()->addDays(60);

        foreach ($bahan as $item) {

            $tanggal = Carbon::parse($item->tanggal_kadaluarsa);

            // Sudah melewati tanggal kadaluarsa
            if ($tanggal->lt($hariIni)) {

                $status = "Kadaluarsa";
                $kadaluarsa++;

            // Masuk H-90
            } elseif ($tanggal->lte($h90)) {

                $status = "Mendekati";
                $mendekati++;

            // Masih lebih dari 90 hari
            } else {

                $status = "Aman";
                $aman++;
            }

            $data[] = [
                'id' => $item->id,
                'nama_bahan' => $item->nama_bahan,
                'merk' => $item->merk,
                'tanggal_kadaluarsa' => $item->tanggal_kadaluarsa,
                'jumlah' => $item->jumlah,
                'satuan' => $item->satuan,
                'status' => $status,

                // Untuk kebutuhan filter frontend
                'h90' => $tanggal->gte($hariIni)
                    && $tanggal->lte($h90),

                'h60' => $tanggal->gte($hariIni)
                    && $tanggal->lte($h60),
            ];
        }

        return response()->json([
            'kadaluarsa' => $kadaluarsa,
            'mendekati' => $mendekati,
            'aman' => $aman,
            'data' => $data,
        ]);
    }
}