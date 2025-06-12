<?php

return [
    'paths' => ['api/*', 'register'], // Add any specific routes here if needed
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:4200'], // Replace with your frontend URL
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
