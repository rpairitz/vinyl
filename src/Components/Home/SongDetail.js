import {useParams} from 'react-router-dom';

const SongDetail = ({songs}) => {
	const {id} = useParams(); // song title from the route
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
};
export default SongDetail;
