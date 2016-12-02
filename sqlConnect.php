<?php
    define("ADMIN_ID", 1);
    define("HASH_PASS", "md5");
    
    $host = getenv('IP');
    $username = getenv('C9_USER');
    $password = '';
    $dbname = 'cheapomail';

    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    if($db->connect_error)
	    die("Connection failed ".$db->connection_error); 
?>