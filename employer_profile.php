<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // important for cookies

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';
$client = new MongoDB\Client("mongodb://127.0.0.1:27017");
$database = $client->jobportal;
$usersCollection = $database->users;

// get cookie
$email = $_COOKIE['rememberedEmail'] ?? '';

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user = $usersCollection->findOne(['email' => $email]);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    exit;
}

// convert MongoDB document to array
$userArray = iterator_to_array($user);

// prepend full URL for profile image if exists
if (!empty($userArray['profileImage'])) {
    $userArray['profileImage'] = "http://localhost/jobportal-backend/" . $userArray['profileImage'];
}

echo json_encode(array_merge(['success' => true], $userArray));
