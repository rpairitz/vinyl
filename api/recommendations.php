<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "wgentry";
$password = "12345";

$conn = new mysqli($servername, $username, $password) or die ('Could not connect to DB' . mysql_error());
// set character set to utf8 to ensure unicode characters don't mess up the json formatting when json_encode()
$conn->set_charset("utf8");

mysqli_select_db($conn, $username);
$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
case 'GET':
	$id = $_GET['id'];
	$query = "select s.id, s.title, s.album_id, a.name as album, a.image_url as album_image_url, s.artist_id, s.artist, s.peak_rank, s.total_weeks_on_chart from songs s, albums a,
			(select * from song_pairs where song1_id = '$id' order by proportion desc limit 10) p
			where s.album_id = a.id and s.id = p.song2_id order by p.proportion desc;";
	$result = $conn->query($query);
	if (!$result){
		// TODO: report error
	}
	else if ($method == 'GET'){
		$rows = array();
		while($r = $result->fetch_assoc()){
			// push output to rows array
			// push output to rows array
			/* note: need to replace â€™; encoding assumed ISO-8859-1, so when query result is set
			 * to UTF-8, right single quotes (') are set to â€™ by mistake
			 */
			array_push($rows, str_replace('â€™',"'",$r));
		}
		echo json_encode($rows, JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE);
	}
}

$conn->close();
