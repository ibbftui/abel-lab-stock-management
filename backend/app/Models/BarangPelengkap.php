<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangPelengkap extends Model
{
    protected $table = 'barang_pelengkap';

    protected $fillable = [

        'nama_barang',

        'keterangan',

        'jumlah',

        'satuan',

    ];
}