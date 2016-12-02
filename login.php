<?php header('Content-Type: text/html; charset=ISO-8859-15');

    session_start();
    include_once("sqlConnect.php");

    $_SESSION["logged_in"] = False;
    $user = addslashes($_POST["username"]);
    $rawPassword = $_POST["password"];
    
    $result = $db->query("SELECT * FROM user WHERE username='$user'");

    $result = $result->fetch();
    
    if(!isset($result)){
        print_r(json_encode(array("result"=>"userNotFound")));
        exit;
    }
    
    $userId = $result["id"];
    $passwordQuery = hash_hmac(HASH_PASS, $rawPassword, $userId);

    $realPassword = $result["password"];

    if(strcmp($passwordQuery, $realPassword) == 0){
        if($userId == ADMIN_ID)
            $type = "admin";
        else
            $type = "user";

        $success = array("result"=>"success", "id"=>$userId, "type"=>$type, "firstname"=>$result["firstname"], "lastname"=>$result["lastname"], "username"=>$user);
        print_r(json_encode($success));

        $_SESSION["logged_in"] = True;
        $_SESSION["user"] = $success;
    } 
    else {
        print_r(json_encode(array("result"=>"incorrectPassword")));
    }
    
?>