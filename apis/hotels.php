<?php

include "../config/db.php";


if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM hotels WHERE id=$id";
    $res = $conn->query($sql);

    if ($res && $res->num_rows > 0) {
        $hotel = $res->fetch_assoc();
        echo json_encode($hotel);
        exit();
    }

    echo json_encode([]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['location'])) {
    $location = strtolower($_GET['location']);
    $sql = "SELECT * FROM hotels WHERE location='$location'";
    $res = $conn->query($sql);

    $hotels = [];

    if ($res && $res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            $hotels[] = $row;
        }

        echo json_encode($hotels);
        exit();
    }

    echo json_encode([]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM hotels";
    $res = $conn->query($sql);

    $hotels = [];

    if ($res && $res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            $hotels[] = $row;
        }

        echo json_encode($hotels);
        exit();
    }

    echo json_encode([]);
    exit();
}
