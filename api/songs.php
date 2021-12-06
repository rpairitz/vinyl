<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "wgentry";
$password = "12345";

$conn = new mysqli($servername, $username, $password) or die ('Could not connect to DB' . mysql_error());

mysqli_select_db($conn, $username);
//print_r($_SERVER);
//print_r($_GET);
$method = $_SERVER['REQUEST_METHOD'];
//print_r($_GET);
//$par = file_get_contents("php://input"); // parameters passed from axios service
//var_dump($par);
//$arr = json_decode(utf8_encode($par)); // JSON broken into an array
//print_r(json_last_error());
//var_dump($arr);
switch ($method){
case 'GET':
	//$string = $arr['string'];
	$string = $_GET['string'];
	if ($string){
		$query = "select * from songs where title like '%$string%' or artist like '%$string%'";
	}
	else {
		// empty search; show all songs, limit
		$query = "select * from songs limit 50";
	}
	$result = $conn->query($query);
	if (!$result){
		// TODO: report error
	}
	else if ($method == 'GET'){
		echo '[';
		if ($result->num_rows > 0){
			for ($i=0; $i < $result->num_rows; $i++){
				echo ($i>0?',':'').json_encode($result->fetch_assoc());
			}
		}
		echo ']';
	}
	//print_r($result);
	/*
		if(isset($arr['string'])){
			$string = $_GET['string'];
			print_r($string);
		}
	 */
}

// TEST
//print_r($method);
//print_r($par);
//print_r($arr);
$conn->close();
