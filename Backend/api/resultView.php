<?php
include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

// SQL query to get all the data
$query = "
    SELECT 
        Sid, name, CA, Exam, Practical, Mcode, tid, dateOfExam, semester, total
    FROM student_marks

";

// Prepare and execute the query
$stmt = $conn->prepare($query);
$stmt->execute();

// Fetch all the results as an associative array
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Check if we have data
if (!$results) {
    echo json_encode(["error" => "No data found."]);
    exit;
}

// Return the results in JSON format
echo json_encode($results);

?>
