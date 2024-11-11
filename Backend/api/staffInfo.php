<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

include_once 'db.php';

// Get the database connection
$db = new Database();
$conn = $db->getConnection();

try {
    // Prepare the corrected SQL statement to retrieve data
    $sql = "SELECT employee.StaffId, employee.FName, employee.LName, employee.Sex, employee.Address, department.DName FROM employee INNER JOIN department ON employee.DNo = department.DNumber";  
    $stmt = $conn->prepare($sql);

    // Execute the statement
    $stmt->execute();

    // Fetch all data and return it as JSON
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (Exception $e) {
    // Log the error and include details in the response for debugging
    error_log("Failed to retrieve data: " . $e->getMessage());
    echo json_encode(array("error" => "Failed to retrieve data", "details" => $e->getMessage()));
}

// Close the statement
$stmt->closeCursor();

// Close the database connection
$conn = null;
?>
