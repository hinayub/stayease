<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Give Feedback</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
    <?php
    include 'db.php';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $name = $_POST['name'];
        $phone_no = $_POST['phone_no'];
        $email = $_POST['email'];
        $feedback = $_POST['feedback'];
        $qry = "INSERT INTO feedback(name,email,phone_no,feedback) VALUES('$name','$email','$phone_no','$feedback',current_timestamp());";
        $result = $conn->query($qry);
        if (!$result) {
            die("data not inserted");
        }
    }
    ?>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white text-center">
                        <h4>Give Your Feedback</h4>
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <div class="mb-3">
                                <label for="name" class="form-label">Your Name</label>
                                <input type="text" name="name" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Your Email</label>
                                <input type="email" name="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label for="phone_no" class="form-label">Phone Number</label>
                                <input type="text" name="phone_no" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="feedback" class="form-label">Your Feedback</label>
                                <textarea name="feedback" rows="4" class="form-control" required></textarea>
                            </div>
                            <div class="text-center">
                                <a class="btn btn-primary" href="index.php">submit</a>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>