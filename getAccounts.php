<?php

	session_start();
	include_once("sqlConnect.php");

	$result = $db->query("SELECT * FROM user");

	$accounts = array();

	while($row = $result->fetch_assoc()){
		$accounts[$row["id"]] = array("id"=>$row["id"], "username"=>$row["username"], "firstname"=>$row["firstname"], "lastname"=>$row["lastname"]);
	}

	print_r(json_encode($accounts));

?>