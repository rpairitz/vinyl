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
	$string = $_GET['string'];
	$date = $_GET['date'];
	/*
	$general = "select * from songs where title like '%$string%' or artist like '%$string%' order by
	peak_rank asc";
	 */
	$query = $conn->prepare("select a.name, a.id, a.artists from song_info as a, 
			(select a.name, POWER( POWER (POWER( a.danceability - b.danceability , 2), .5 ) + 
				POWER (POWER( a.normal_loudness - b.normal_loudness , 2), .5 ) + 
					POWER (POWER( a.acousticness - b.acousticness , 2), .5 ) + 
						POWER (POWER( a.liveness - b.liveness, 2), .5 ) + 
							POWER (POWER( a.speechiness - b.speechiness, 2), .5 ) + 
								POWER (POWER( a.valence - b.valence, 2), .5 ) +  
									POWER (POWER( a.normal_tempo - b.normal_tempo , 2), .5 ) + 
										POWER (POWER( a.energy- b.energy , 2), .5 ) + 
											POWER (POWER( a.normal_time_signature - b.normal_time_signature , 2), .5 ), .5) as minkowski_similarity, a.popularity, a.id 
												from song_info as a, 
														(select * from song_info as a, 
																	(select max(popularity) as max_popularity from song_info where name like ?) as b where a.popularity = b.max_popularity and name like ?) as b 
																				order by popularity desc, minkowski_similarity desc) 
																							as b where a.release_date < DATE_ADD(?, INTERVAL -9 MONTH) 
																										and a.release_date > DATE_ADD(?, INTERVAL -18 MONTH) and a.id = b.id 
																										limit 10;");
	if ($query){  
		$param = '%' . $string . '%'; // need to concatenate wildcards to string to add to query
		$query->bind_param("ssss",$param,$param,$date,$date);
		$query->execute();
		$query->bind_result($title,$id,$artists);
		$query->store_result();

		$rows = array();
		while($r = $query->fetch()){
			// push output to rows array
			/* note: need to replace â€™; encoding assumed ISO-8859-1, so when query result is set
			* to UTF-8, right single quotes (') are set to â€™ by mistake
			*/
			$output = array('id'=>$id,'name'=>$title,'artist'=>$artists);
			array_push($rows, str_replace('â€™',"'",$output));
		}
		echo json_encode($rows, JSON_HEX_APOS|JSON_HEX_QUOT|JSON_UNESCAPED_UNICODE);
	}
}

$conn->close();
