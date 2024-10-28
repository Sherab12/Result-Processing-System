<?php
header('Content-Type: application/json');

// Include database connection
include_once 'db.php';

// Create an instance of the Database class and get the connection
$database = new Database();
$conn = $database->getConnection(); // Make sure the connection is obtained here

if ($conn === null) {
    echo json_encode(["status" => "error", "message" => "Database connection failed!"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    if (isset($data['dataWithModuleAndClass']) && is_array($data['dataWithModuleAndClass'])) {
        // Prepare and bind the SQL statement
        $stmt = $conn->prepare("INSERT INTO student_marks (Sid, name, CA, Exam, Practical, Mcode, tid, dateOfExam, semester, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        foreach ($data['dataWithModuleAndClass'] as $student) {
            $ID = $student['ID'];
            $name = $student['Name'];
            $CA = $student['ca'];
            $Mcode = $student['code'];
            $dateOfExam = $student['dateOfExam'];
            $Exam = $student['exam'];
            $Practical = $student['practical'];
            $semester = $student['semester'];
            $tid = $student['tid'];

            // Calculate total as the sum of CA, Exam, and Practical
            $total = $CA + $Exam + $Practical;

            // Use parameterized queries to prevent SQL injection
            $stmt->bindParam(1, $ID);
            $stmt->bindParam(2, $name);
            $stmt->bindParam(3, $CA);
            $stmt->bindParam(4, $Exam);
            $stmt->bindParam(5, $Practical);
            $stmt->bindParam(6, $Mcode);
            $stmt->bindParam(7, $tid);
            $stmt->bindParam(8, $dateOfExam);
            $stmt->bindParam(9, $semester);
            $stmt->bindParam(10, $total); // Bind the total value

            if (!$stmt->execute()) {
                // Send error message as JSON
                echo json_encode(["status" => "error", "message" => "Error inserting record: " . implode(", ", $stmt->errorInfo())]);
                exit;
            }
        }

        // Close the statement and connection
        $stmt = null;
        $conn = null;

        // Return success response in JSON format
        echo json_encode(["status" => "success", "message" => "Data inserted successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid data!"]);
    }
}
?>
