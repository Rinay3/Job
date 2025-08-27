<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Load MongoDB
require __DIR__ . '/vendor/autoload.php';

try {
    $client = new MongoDB\Client("mongodb://127.0.0.1:27017");
    $db = $client->jobportal;
    $jobsCollection = $db->jobs;
    $usersCollection = $db->users; // to get employer_id from email
} catch (Throwable $e) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (
    !$data ||
    !isset($data['title'], $data['description'], $data['location'], $data['salary'], $data['email'])
) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Get employer info from email
$employer = $usersCollection->findOne(["email" => $data['email'], "role" => "employer"]);
if (!$employer) {
    echo json_encode(["success" => false, "message" => "Employer not found"]);
    exit;
}

// Create employer_id: first 4 letters of name + random 5 digits
$empName = substr($employer['name'], 0, 4);
$randNum = rand(10000, 99999);
$employer_id = strtoupper($empName) . $randNum;

// Insert job
$result = $jobsCollection->insertOne([
    "title" => $data['title'],
    "description" => $data['description'],
    "location" => $data['location'],
    "salary" => $data['salary'],
    "employer_id" => $employer_id,
    "created_at" => new MongoDB\BSON\UTCDateTime(),
]);

echo json_encode([
    "success" => $result->getInsertedCount() > 0,
    "message" => $result->getInsertedCount() > 0 ? "Job posted successfully" : "Failed to post job"
]);
?>
