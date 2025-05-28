<?php

include "../config/db.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = 123456;

    $sql = "SELECT * FROM users WHERE username='$username'";
    $res = $conn->query($sql);
    if ($res && $res->num_rows > 0) {
        echo json_encode(['error' => "Username already exists."]);
        exit();
    }

    $sql = "SELECT * FROM users WHERE email='$email'";
    $res = $conn->query($sql);
    if ($res && $res->num_rows > 0) {
        echo json_encode(['error' => "Email already exists."]);
        exit();
    }

    $sql = "INSERT INTO users (name, email, username, password) VALUES ('$name', '$email', '$username', '$password')";
    $res = $conn->query($sql);

    if ($res) {
        echo json_encode(['success' => "Account created successfully"]);
        exit();
    }

    echo json_encode(['success' => false, 'error' => 'User not created']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $res = $conn->query($sql);

    if ($res && $res->num_rows > 0) {
        echo json_encode(['success' => $username . " login successfully"]);
        exit();
    }

    echo json_encode(['error' => "Invalid credential"]);
    exit();
}
