<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AlatLab;
use App\Models\BahanKimia;
use App\Models\BarangPelengkap;
use Illuminate\Http\Request;
use App\Models\LogAktivitas;
use Carbon\Carbon;  

class DashboardController extends Controller
{
    public function index()
    {
        $totalAlat = AlatLab::count();

        $totalBahan = BahanKimia::count();

        $stokRendah =
            AlatLab::where('jumlah', '<', 10)->count()
            +
            BahanKimia::where('jumlah', '<', 10)->count()
            +
            BarangPelengkap::where('jumlah', '<', 10)->count();

        $mendekatiKadaluarsa = BahanKimia::whereDate(
        'tanggal_kadaluarsa',
        '<=',
        Carbon::now()->addDays(30)
        )->count();

        $aktivitasTerbaru = LogAktivitas::latest()
            ->take(5)
            ->get();    

        return response()->json([

            'total_alat' => $totalAlat,

            'total_bahan' => $totalBahan,

            'stok_rendah' => $stokRendah,

            'mendekati_kadaluarsa' => $mendekatiKadaluarsa,

            'aktivitas_terbaru' => $aktivitasTerbaru,

        ]);
        
    }
}