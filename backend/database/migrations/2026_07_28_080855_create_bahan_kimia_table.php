<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bahan_kimia', function (Blueprint $table) {

            $table->id();

            $table->string('nama_bahan');

            $table->string('merk')->nullable();

            $table->date('tanggal_kadaluarsa');

            $table->text('keterangan')->nullable();

            $table->decimal('jumlah', 10, 2);

            $table->string('satuan');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bahan_kimia');
    }
};