<html>
<body>
<?php

$search = $_POST['song_name'];
$date_search = $_POST['date'];
$song_name_insert = $_POST['new_song_name'];
$artist_name_insert = $_POST['new_artist_name'];

$servername = "localhost";
$username = "wgentry";
$password = "12345";

$conn = new mysqli($servername, $username, $password) or die ('Could not connect to DB' . mysql_error());

mysqli_select_db($conn, $username);

//find all data related to song or artist
$sql = "select * from songs where title = '$search' or artist = '$search'";
// find all songs related to certain date
$date_sql = "select * from chart_positions as a, songs as b where a.date = '$date_search' limit 10";
$result = $conn->query($sql);
$date_result = $conn->query($date_sql);

//$finfo = $result->fetch_field_direct(2);
//$finfo2 = $result->fetch_field_direct(1);

// print all song info with coloumn titles
echo "<h1> Song Search </h1> \n";
echo "<table>\n";
if ($result->num_rows > 0){
while($row = $result->fetch_assoc() ){
//	echo $finfo->name." ".$finfo2->name.""; 
//	echo "<br>";
	echo $row["artist"]."  ".$row["title"]."  ".$row["total_weeks_on_chart"]."<br>";
}
} else {
	echo "0 records";
}

// print all songs with related date
echo "</table>\n";

echo "<h1> Date Search </h1>";
echo "<table> \n";
if ($date_result->num_rows > 0){
while($row = $date_result->fetch_assoc() ){
	echo $row["artist"]."  ".$row["title"]."  ".$row["date"]."<br>";
}
} else {
	echo "0 records";
}



echo "</table>\n";

$query = "select * from songs limit 50";
$result = $conn->query($query);
print('Query occurred');

// print all song info with coloumn titles
echo "<h1> Song List </h1> \n";
echo "<table>\n";
if ($result->num_rows > 0){
while($row = $result->fetch_assoc() ){
//	echo $finfo->name." ".$finfo2->name.""; 
//	echo "<br>";
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


$conn->close();

?>
</body>
</html>
