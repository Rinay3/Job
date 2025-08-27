<?php
require __DIR__ . '/vendor/autoload.php';
try {
    $client = new MongoDB\Client("mongodb://127.0.0.1:27017");
    $db = $client->jobportal; // your DB name
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
?>
