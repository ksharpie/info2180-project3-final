<?php header('Content-Type: text/html; charset=ISO-8859-15');   
    
    session_start();
    include_once("sqlConnect.php"); 

    $firstname = addslashes($_POST["firstname"]);
    $lastname = addslashes($_POST["lastname"]);
    $username = addslashes($_POST["username"]);
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    if(strcmp($password, $confirmPassword) != 0){
        print_r(json_encode(array("result"=>"passwordsNotIdentical")));
        exit;
    }

    $result = $db->query("SELECT * FROM user WHERE username='$username'");
    
    if($result->num_rows > 0){
        print_r(json_encode(array("result"=>"nameExists")));    
        exit;
    }

    $status = $db->query("SHOW TABLE STATUS WHERE name='user'");
    
    $status = $status->fetch();
    
    $newUserId = $status["Auto_increment"];
    
    $hashedPassword = hash_hmac(HASH_PASS, $password, $newUserId);

    $success = $db->query("INSERT INTO user (firstname, lastname, username, password) VALUES ('$firstname', '$lastname', '$username', '$hashedPassword')");

    if(!$success){
        print_r(json_encode(array("result"=> "failed")));
        exit;
    }

    print_r(json_encode(array("result"=>"success")));
    
?>