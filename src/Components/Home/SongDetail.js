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
			<div className="detail-container">
			<img className="detail-img"
			src={song.album_image_url} width="500px" align="center" alt="album-cover"/>
			<span className="song-details">
				<h1>{song.title}</h1>
				<h2>{song.artist} — {song.album}</h2>
				<h2>Charted for {song.total_weeks_on_chart} weeks</h2>
				<h2>Peaked at #{song.peak_rank}</h2>
			</span>
			</div>
			{recs.length > 0 ? (
				<>
				<h2>Recommended Songs</h2>
				<ul className="song-list">
					{recs.map((rec) => (
						<li className="item-container" key={rec.id}>
						<Link className="link item-link" to={{pathname:`/songs/${rec.id}`,state: {song: rec}}}>
						<div className="box-detail">
							<img className="item-img" src={rec.album_image_url} width="2%" alt="album-cover"/> &#160;
							<span><h1>{rec.title}</h1>
							<h2>{rec.artist} — {rec.album}</h2>
							</span>
						</div>
						</Link>
						</li>
					))}
				</ul>
				</>
			):<></>}
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
