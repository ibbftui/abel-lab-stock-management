<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BahanKimia extends Model
{
    protected $table = 'bahan_kimia';

    protected $fillable = [

        'nama_bahan',

        'merk',

        'tanggal_kadaluarsa',

        'keterangan',

        'jumlah',

        'satuan',

    ];
}