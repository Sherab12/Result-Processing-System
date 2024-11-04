<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow requests from your frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "result_processing_system";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve data from POST request
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['data'])) {
    $updatedRows = 0;
    $errors = [];
    
    foreach ($data['data'] as $student) {
        $TID = $student['TID'];
        $CA = $student['CA'];
        $Practical = isset($student['Practical']) ? $student['Practical'] : null;
        $Exam = $student['Exam'];

        // Prepare update statement
        $sql = "UPDATE mark SET CA=?, Practical=?, Exam=? WHERE TID=?";
        $stmt = $conn->prepare($sql);

        // Bind parameters with appropriate handling for nullable Practical
        if ($Practical !== null) {
            $stmt->bind_param("iiii", $CA, $Practical, $Exam, $TID);
        } else {
            $stmt->bind_param("iii", $CA, $Exam, $TID);
        }

        // Execute the query and handle errors
        if ($stmt->execute()) {
            $updatedRows++;
        } else {
            $errors[] = "Failed to update TID $TID: " . $stmt->error;
        }
    }

    // Response based on update results
    if (empty($errors)) {
        echo json_encode(["message" => "$updatedRows rows updated successfully"]);
    } else {
        echo json_encode(["message" => "$updatedRows rows updated", "errors" => $errors]);
    }
} else {
    echo json_encode(["error" => "No data provided"]);
}

$conn->close();
?>
