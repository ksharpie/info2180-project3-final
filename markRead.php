<?php

	session_start();
	include_once("sqlConnect.php");

	$messageId = $_POST["messageId"];
	$readerId = $_POST["readerId"];

	$db->query("INSERT INTO message_read (message_id, reader_id, date) VALUES ('$messageId', '$readerId', NOW())");

?>