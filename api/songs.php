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
	//$string = $arr['string'];
	$string = $_GET['string'];
	// prepare the associated query against sql injection
	if ($string){
		$query = $conn->prepare("select s.id, s.title, s.album_id, a.name as album, a.image_url as album_image_url, s.artist_id, s.artist, s.peak_rank, s.total_weeks_on_chart from songs s, albums a where s.album_id = a.id and (s.title like ? or s.artist like ?) order by s.peak_rank asc;");
		if ($query){
			$param = '%' . $string . '%'; // need to concatenate wildcards to string to add to query
			$query->bind_param("ss",$param,$param);
		}
	}
	else {
		// empty search; show all songs, limit
		$query = $conn->prepare("select s.id, s.title, s.album_id, a.name as album, a.image_url as album_image_url, s.artist_id, s.artist, s.peak_rank, s.total_weeks_on_chart from songs s, albums a where s.album_id = a.id order by s.total_weeks_on_chart desc limit 50;");
	}

	if ($query){
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
			$output = array('id'=>$id,'title'=>$title,'album_id'=>$album_id,
				'album_image_url'=>$album_image_url,'artist_id'=>$artist_id,'artist'=>$artist,
				'peak_rank'=>$peak_rank,'total_weeks_on_chart'=>$weeks);
			array_push($rows, str_replace('â€™',"'",$output));
		}
		echo json_encode($rows, JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE);
	}
}

$conn->close();
