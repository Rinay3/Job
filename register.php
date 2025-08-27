<?php
// ---- CORS headers ----
header("Access-Control-Allow-Origin: http://localhost:5173"); // React dev server
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/db.php';

// ---- Register logic ----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['name'], $data['email'], $data['password'], $data['role'])) {
        echo json_encode(["success" => false, "message" => "Invalid input"]);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    $role = $data['role'];

    // Check if email exists
    $existing = $usersCollection->findOne(["email" => $email]);
    if ($existing) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }

    // Insert into MongoDB
    $result = $usersCollection->insertOne([
        "name" => $name,
        "email" => $email,
        "password" => $password,
        "role" => $role,
        "created_at" => new MongoDB\BSON\UTCDateTime()
    ]);

    echo json_encode([
        "success" => $result->getInsertedCount() > 0,
        "message" => "User registered successfully"
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
