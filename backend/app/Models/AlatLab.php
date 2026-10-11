<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlatLab extends Model
{
    use HasFactory;

    protected $table = 'alat_lab';

    protected $fillable = [
        'nama_alat',
        'jumlah',
        'satuan',
        'lokasi',
        'kondisi',
        'status',
    ];
}