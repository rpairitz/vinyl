import {useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';
// import getRecommendedSongs from service
import {getRecommended} from '../../Services/RecommendationService.js';

const SongDetail = () => {
	// get song state through useLocation hook
	const location = useLocation(); // song title from the route
	const song = location.state.song;

	// state variable for holding recommended song data
	const [recs,setRecs] = useState([]);

	// useEffect for updating recs state var
	useEffect(() => {
		if (song) {
			getRecommended(song.id).then((recList) => {
				console.log(recList);
				setRecs(recList);
			});
		}
	}, [song]);
	
	return (
		<div>
			<div>
				<img src={song.album_image_url} width="500px" align="center" alt="album-cover"/>
			</div>
			<h3>Recommended Songs</h3>
			{recs.length > 0 && (
				<ul>
					{recs.map((rec) => (
						<li key={rec.id}>
						<Link to={{pathname:`/songs/${rec.id}`,state: {song: rec}}}>
							<img className="list-image" src={rec.album_image_url} width="2%" alt="album-cover"/> &#160;
							<b>{rec.title}</b> &#160;
							Artist: {rec.artist} &#160;
							Album: {rec.album} &#160;
							<br />
							<br/>
						</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
	/*
	console.log(songs);

	return (
		<div className="detail">
		<h1>test</h1>
		{console.log(songs)}
			{songs.filter((song) => song.id === id)
			.map((song) => (
				<div key={song.id}>
					{song.album}
					<h2>{song.title} by {song.artist}</h2>
					<h3>Peak Rank: {song.peak_rank}</h3>
					<h3>Weeks on Billboard 100: {song.total_weeks_on_chart}</h3>
				</div>
			))}
		</div>
	);
	*/
};
export default SongDetail;
