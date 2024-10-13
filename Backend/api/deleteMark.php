<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include your database connection
include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

// Check if code parameter is provided in the POST request
if (isset($_POST['code'])) {
    $code = $_POST['code'];  // Module Code

    // Prepare the SQL statement
    $sql = "DELETE FROM student_marks WHERE Mcode = ?";
    
    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Execute the statement
    if ($stmt->execute([$code])) {  // Execute the statement with the parameter
        if ($stmt->rowCount() > 0) { // Check if any rows were deleted
            echo json_encode(array("status" => "success", "message" => "Data deleted successfully!"));
        } else {
            echo json_encode(array("status" => "error", "message" => "No records found with the given Mcode."));
        }
    } else {
        echo json_encode(array("status" => "error", "message" => "Error deleting data: " . implode(", ", $stmt->errorInfo())));
    }

    // Close the statement
    $stmt->closeCursor();
} else {
    echo json_encode(array("status" => "error", "message" => "Missing required parameters"));
}

// Close the database connection
$conn = null; // Optionally close the connection
?>
