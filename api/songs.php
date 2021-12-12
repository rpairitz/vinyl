<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "wgentry";
$password = "12345";

$conn = new mysqli($servername, $username, $password) or die ('Could not connect to DB' . mysql_error());
// set character set to utf8 to ensure unicode characters don't mess up the json formatting when json_encode()
$conn->set_charset("utf8");

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
		$query = "select * from songs where title like '%$string%' or artist like '%$string%' order by
			peak_rank asc";
	}
	else {
		// empty search; show all songs, limit
		$query = "select * from songs order by total_weeks_on_chart desc limit 50";
	}
	$result = $conn->query($query);
	if (!$result){
		// TODO: report error
	}
	else if ($method == 'GET'){
		$rows = array();
		while($r = $result->fetch_assoc()){
			$id = $r['id'];
			$artist_id = $r['artist_id'];
			$album_id = $r['album_id'];
			$title = $r['title'];
			$artist = $r['artist'];
			$album = $r['album'];
			$peak_rank = $r['peak_rank'];
			$weeks = $r['total_weeks_on_chart'];
			$duration = $r['duration_ms'];
			$explicit = $r['explicit'];
			$date = $r['release_date'];
			$danceability = $r['danceability'];
			$energy = $r['energy'];
			$loudness = $r['loudness'];
			$mode = $r['mode'];
			$speech = $r['speechiness'];
			$acoustic = $r['acousticness'];
			$instrumental = $r['instrumentalness'];
			$liveness = $r['liveness'];
			$valence = $r['valence'];
			$tempo = $r['tempo'];
			$sig = $r['time_signature'];
			$norm_loudness = $r['normal_loudness'];
			$norm_tempo = $r['normal_tempo'];
			$norm_sig = $r['normal_time_signature'];
			$norm_pop = $r['normal_popularity'];
			$album_img = $r['album_image_url'];
			$output = array('id'=>$id,'artist_id'=>$artist_id,'album_id'=>$album_id,
				'title'=>$title,'artist'=>$artist,'album'=>$album,'peak_rank'=>$peak_rank,
				'total_weeks_on_chart'=>$weeks,'duration_ms'=>$duration,'explicit'=>$explicit,
				'release_date'=>$date,'danceability'=>$danceability,'energy'=>$energy,
				'loudness'=>$loudness,'mode'=>$mode,'speechiness'=>$speech,
				'acousticness'=>$acoustic,'instrumentalness'=>$instrumental,'liveness'=>$liveness,
				'valence'=>$valence,'tempo'=>$tempo,'time_signature'=>$sig,
				'normal_loudness'=>$norm_loudness,'normal_tempo'=>$norm_tempo,
				'normal_time_signature'=>$norm_sig,'normal_popularity'=>$norm_pop,
				'album_image_url'=>$album_img
			);
			// push output to rows array
			/* note: need to replace â€™; encoding assumed ISO-8859-1, so when query result is set
			 * to UTF-8, right single quotes (') are set to â€™ by mistake
			 */
			array_push($rows, str_replace('â€™',"'",$output));
		}
		echo json_encode($rows, JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE);
	}
}

$conn->close();
