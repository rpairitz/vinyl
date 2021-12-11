import {useLocation} from 'react-router-dom';
// TODO: import getRecommendedSongs from service

const SongDetail = () => {
	// get song state through useLocation hook
	const location = useLocation(); // song title from the route
	const song = location.state.song;

	// TODO: create state variable relatedSongs for holding related song data
	
	// TODO: create useEffect for updating relatedSongs state var
	
	return (
		<div>
			<div>
				<img src={song.album_image_url} width="500px" align="center"/>
			</div>
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
