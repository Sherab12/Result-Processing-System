<?php

// Include the database connection
include_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if email and password are provided
    if (!empty($_POST['Email']) && !empty($_POST['Password'])) {
        $email = filter_var($_POST['Email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['Password'];

        // Initialize database connection
        $database = new Database();
        $db = $database->getConnection();

        // Query to fetch user based on the provided email
        $query = "SELECT uid, name, email, password, role FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);

        try {
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify if user exists and password matches
            if ($user && $password === $user['password']) {
                // User authenticated
                echo json_encode([
                    "userID" => $user['uid'],
                    "Name" => $user['name'],
                    "email" => $user['email'],
                    "role" => $user['role']
                ]);
            } else {
                // Invalid credentials
                echo json_encode(["role" => "Error", "message" => "Invalid email or password."]);
            }
        } catch (PDOException $e) {
            // Log the error and return a generic message
            error_log("Database error: " . $e->getMessage());
            echo json_encode(["message" => "An error occurred, please try again later."]);
        }
    } else {
        // Missing email or password
        echo json_encode(["message" => "Email and Password are required."]);
    }
} else {
    // Invalid request method
    echo json_encode(["message" => "Only POST requests are allowed."]);
}
