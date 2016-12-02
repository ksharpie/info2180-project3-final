<?php

	session_start();
	include_once("sqlConnect.php");

	$sender = $_POST["sender"];
	$recipients = "|".implode("|", $_POST["recipients"])."|";
	$subject = addslashes($_POST["subject"]);
	$body = addslashes($_POST["body"]);

	$success = $db->query( "INSERT INTO message (recipient_ids, user_id, subject, body, date_sent) VALUES ('$recipients', $sender, '$subject', '$body', NOW())");

	if($success){
		print_r(json_encode(array("result"=>"success")));
		exit;
	}
	else{
		print_r(json_encode(array("result"=>"failure")));
    }
?>