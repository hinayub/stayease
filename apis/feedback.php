<?php
include '../config/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hotelId = $_POST['hotelId'];
    $user = $_POST['user'];
    $feedback = $_POST['feedback'];
    $qry = "INSERT INTO hotelfeedback (usermail,hotel_id,feedback) VALUES('$user','$hotelId','$feedback')";
    $result = $conn->query($qry);
    if ($result) {
        echo json_encode(["res" => "successfull"]);
    } else {
        echo json_encode(["res" => "problem"]);
    }
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $hotelId = $_GET['hotelId'];
    $arry = [];
    $qry = "SELECT* FROM hotelfeedback where hotel_id= $hotelId";
    $result = $conn->query($qry);
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $arry[] = $row;
        }
        echo json_encode($arry);
    } else {
        echo json_encode(["error" => "problem"]);
    }
}
