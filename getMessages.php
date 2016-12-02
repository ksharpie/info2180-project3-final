<?php

	session_start();
	include_once("sqlConnect.php");
	$id = $_POST["id"];

	$result = $db->query("SELECT * FROM message WHERE recipient_ids LIKE \"%|$id|%\" ORDER BY date_sent DESC LIMIT 10");

	$messages = array();

	while($row = $result->fetch()){
		$messages[$row["id"]] = $row;
	}

	$result = $db->query("SELECT message_id, date FROM message_read WHERE reader_id=$id");

	while($row = $result->fetch()){
		$messages[$row["message_id"]]["read_at"] = $row["date"];
	}

	print_r(json_encode($messages));

?>