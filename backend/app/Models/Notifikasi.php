<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $table = 'notifikasi';

    protected $fillable = [
        'bahan_id',
        'status',
    ];

    public function bahan()
    {
        return $this->belongsTo(BahanKimia::class, 'bahan_id');
    }
}