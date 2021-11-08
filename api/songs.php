<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "wgentry";
$password = "12345";

$conn = new mysqli($servername, $username, $password) or die ('Could not connect to DB' . mysql_error());

mysqli_select_db($conn, $username);

$method = $_SERVER['REQUEST_METHOD'];
$par = file_get_contents("php://input"); // parameters; should give searchSong object for instance, in case of search
$arr = json_decode($par); // parameter broken into an array

// TEST
echo $method;
echo $par;
echo $arr;

// check action
switch ($method){
	case 'GET':
		$searchString = $arr['string']; 
		$date = $arr['date'];
		if ($searchString){
			$query = "select * from songs where title = '$searchString' or artist = '$searchString'"; 
		}
		else if ($date){
			$query = "select * from chart_positions as a, songs as b where a.date = '$date' limit 10";	
		}
		break;
	case 'POST':
		// TODO: insert queries
		break;
}

// run SQL statement
$response = $conn->query($query);

// die if failed
if (!$response){
	http_response_code(500);
	//die(mysqli_error($con));
}
else{
	$data = json_encode($response);
	echo $data;
}

/* OLD */
/*
$search = $_GET['song_name'];
$date_search = $_GET['date'];
$song_name_insert = $_POST['new_song_name'];
$artist_name_insert = $_POST['new_artist_name'];

//find all data related to song or artist
$sql = "select * from songs where title = '$search' or artist = '$search'";
// find all songs related to certain date
$date_sql = "select * from chart_positions as a, songs as b where a.date = '$date_search' limit 10";

// issue queries
$result = $conn->query($sql);
$date_result = $conn->query($date_sql);


$query = "select * from songs limit 50";
$result = $conn->query($query);
print('Query occurred');

// print all song info with coloumn titles
echo "<h1> Song List </h1> \n";
echo "<table>\n";
if ($result->num_rows > 0){
while($row = $result->fetch_assoc() ){
	echo $row["artist"]."  ".$row["title"]."  ".$row["total_weeks_on_chart"]."<br>";
}
} else {
	echo "0 records";
}


$query = "INSERT INTO songs (id, title, artist,peak_rank,total_weeks_on_chart) VALUES ('test18','$song_name_insert', '$artist_name_insert',0,0)";

if ($conn->query($query) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $query . "<br>" . $conn->error;
}
*/


$conn->close();

?>