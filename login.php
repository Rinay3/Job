<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db.php'; // MongoDB connection

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

if (!$email || !$password || !$role) {
    echo json_encode(['success' => false, 'message' => 'Email, password, and role are required']);
    exit;
}

$usersCollection = $client->jobportal->users;
$user = $usersCollection->findOne(['email' => $email, 'role' => $role]);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit;
}

if (!password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid password']);
    exit;
}

// Set cookie with user email
setcookie("rememberedEmail", $user['email'], time() + 86400, "/", "", false, true); // httponly

echo json_encode([
    'success' => true,
    'email' => $user['email'],
    'role' => $user['role']
]);
?>
