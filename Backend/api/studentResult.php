<?php
include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

// Check if stdno is provided in the request
if (!isset($_GET['stdno'])) {
    echo json_encode(["error" => "Student number (stdno) is required."]);
    exit;
}

// Get the stdno from the request
$stdno = $_GET['stdno'];

// SQL query to get data for a specific student number
$query = "
    SELECT 
        Sid, name, CA, Exam, Practical, Mcode, tid, dateOfExam, semester, total
    FROM declare_marks
    WHERE Sid = :stdno
";

// Prepare and execute the query with parameter binding
$stmt = $conn->prepare($query);
$stmt->bindParam(':stdno', $stdno, PDO::PARAM_STR);
$stmt->execute();

// Fetch all the results as an associative array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return an empty array if no data is found
if (!$results) {
    echo json_encode([]);
} else {
    // Return the results in JSON format
    echo json_encode($results);
}

?>
