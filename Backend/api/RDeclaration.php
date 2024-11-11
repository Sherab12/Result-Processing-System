<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

try {
    // Start a transaction
    $conn->beginTransaction();

    // Prepare the SQL statement to copy data to declare_marks table
    $sql = "INSERT INTO declare_marks (Sid, name, CA, Exam, Practical, Mcode, dateOfExam, semester, total)
            SELECT Sid, name, CA, Exam, Practical, Mcode, dateOfExam, semester, total
            FROM student_marks";

    $stmt = $conn->prepare($sql);
    
    // Execute the statement
    $stmt->execute();

    // Commit the transaction
    $conn->commit();

    echo json_encode(array("message" => "Marks successfully copied to declare_marks"));

} catch (Exception $e) {
    // Rollback the transaction in case of error
    $conn->rollBack();
    error_log("Failed to copy marks: " . $e->getMessage()); // Log the error
    echo json_encode(array("error" => "Failed to copy marks to declare_marks"));
}

// Close the statement
$stmt->closeCursor();

// Close the database connection
$conn = null;
?>
