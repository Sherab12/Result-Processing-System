<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

// Check if code parameter is provided in the POST request
if (isset($_POST['code'])) {
    $code = $_POST['code'];  // Module Code

    // Prepare the SQL statement
    $sql = "SELECT Sid, name, CA, Exam, Practical, Mcode, dateOfExam, semester, total
            FROM student_marks
            WHERE Mcode = ?";  // Filter by Module Code

    $stmt = $conn->prepare($sql);
    
    // Execute the statement
    $stmt->execute([$code]);

    // Fetch data and return it as JSON
    $marks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Log the fetched marks for debugging
    error_log("Fetched marks: " . print_r($marks, true)); // Log fetched data

    // Check if any marks were found
    if (count($marks) > 0) {
        echo json_encode($marks);
    } else {
        echo json_encode(array("message" => "No undeclared marks found"));
    }

    // Close the statement
    $stmt->closeCursor();
} else {
    echo json_encode(array("error" => "Missing required parameters"));
}

// Close the database connection
$conn = null; // Optionally close the connection
?>
