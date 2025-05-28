<?php
include '../config/db.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $checkIn = $_POST['checkIn'];
    $checkOut = $_POST['checkOut'];
    $totalGuest = $_POST['totalGuest'];
    $hotelId = $_POST['hotelId'];
    $username = $_POST['username'];
    $qry = "INSERT INTO reservations(hotel_id,username,check_in_date,check_out_date,number_of_members) VALUES('$hotelId','$username','$checkIn','$checkOut','$totalGuest')";
    $result = $conn->query($qry);
    if ($result) {
        echo json_encode(["success" => "$username. your room reserve"]);
    } else {

        echo json_encode(["error" => "Database error: " . $conn->error]);
    }
}
