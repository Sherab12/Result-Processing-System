<?php

include_once 'db.php';


try {
    // Create a database connection
    $database = new Database();
    $db = $database->getConnection();

    // Check if TID is provided in the query parameters
    if (isset($_GET['TID'])) {
        $tid = $_GET['TID'];

        // Query the database to retrieve rows where TID matches
        $query = "SELECT TID, ModuleCode, ModuleName, Year FROM module_taught WHERE TID = :tid";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':tid', $tid);
        $stmt->execute();

        // Fetch all rows as an associative array
        $modules = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Output the data in JSON format
        echo json_encode($modules);
    } else {
        // If no TID provided, return an error message
        echo json_encode(["error" => "TID parameter is missing."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

?>
