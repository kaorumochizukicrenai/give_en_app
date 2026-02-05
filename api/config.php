<?php
return [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'give_en',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: '',
        'charset' => 'utf8mb4',
    ],
    'stripe' => [
        'public_key' => getenv('STRIPE_PUBLIC_KEY') ?: 'pk_test_replace_me',
        'secret_key' => getenv('STRIPE_SECRET_KEY') ?: 'sk_test_replace_me',
    ],
];
