<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Laboran IBB',
                'email' => 'laboran@ui.ac.id',
                'password' => 'password',
                'role' => 'Laboran',
            ]
        );

        User::updateOrCreate(
            ['username' => 'kepala'],
            [
                'name' => 'Kepala Lab IBB',
                'email' => 'kepala@ui.ac.id',
                'password' => 'password',
                'role' => 'Kepala Lab',
            ]
        );
    }
}
