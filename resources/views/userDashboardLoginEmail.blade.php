<!DOCTYPE html>
<html>

<head>
    <title>User Dashboard Login Email</title>
    <style>
        span {
            color: black;
            font-size: 19px;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <h2>Hello!</h2>
    <p>Click the link below to login in dashboard:</p>
    <span>Your Email: <strong>{{ $userData[0] }}</strong></span> <br>
    <span>Your Password: <strong>{{ $userData[1] }}</strong></span> <br>
    <a href="http://127.0.0.1:8000/auth/console/access/login" target="_blank">Login</a>
</body>

</html>
