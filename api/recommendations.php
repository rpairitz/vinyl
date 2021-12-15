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
	$query = $conn->prepare("select s.id, s.title, s.album_id, a.name as album, a.image_url as album_image_url, s.artist_id, s.artist, s.peak_rank, s.total_weeks_on_chart from songs s, albums a,
			(select * from song_pairs where song1_id = ? order by proportion desc limit 10) p
			where s.album_id = a.id and s.id = p.song2_id order by p.proportion desc;");
	if ($query){
		$query->bind_param("s",$id);
		$query->execute();
		$query->bind_result($id,$title,$album_id,$album,$album_image_url,$artist_id,$artist,
			$peak_rank,$weeks);
		$query->store_result();
		$rows = array();
		while($r = $query->fetch()){
			// push output to rows array
			/* note: need to replace â€™; encoding assumed ISO-8859-1, so when query result is set
			* to UTF-8, right single quotes (') are set to â€™ by mistake
			*/
			$output = array('id'=>$id,'title'=>$title,'album_id'=>$album_id,'album'=>$album,
				'album_image_url'=>$album_image_url,'artist_id'=>$artist_id,'artist'=>$artist,
				'peak_rank'=>$peak_rank,'total_weeks_on_chart'=>$weeks);
			array_push($rows, str_replace('â€™',"'",$output));
		}
		echo json_encode($rows, JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE);
	}
}

$conn->close();
