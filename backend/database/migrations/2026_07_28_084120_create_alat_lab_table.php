<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alat_lab', function (Blueprint $table) {
            $table->id();

            $table->string('nama_alat');
            $table->integer('jumlah')->default(0);
            $table->string('satuan');
            $table->string('lokasi');

            $table->enum('kondisi', [
                'Baik',
                'Rusak Ringan',
                'Rusak Berat'
            ])->default('Baik');

            $table->enum('status', [
                'Tersedia',
                'Dipinjam',
                'Maintenance'
            ])->default('Tersedia');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alat_lab');
    }
};