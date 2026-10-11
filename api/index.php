<?php

// Create writable tmp directories required for Vercel serverless
$directories = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];

foreach ($directories as $directory) {
    if (!is_dir($directory)) {
        @mkdir($directory, 0755, true);
    }
}

// Point to the backend's public/index.php
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../backend/public';
chdir(__DIR__ . '/../backend/public');

require __DIR__ . '/../backend/public/index.php';
