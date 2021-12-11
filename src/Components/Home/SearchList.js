import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SearchForm from './SearchForm.js';
import {searchSongs} from '../../Services/SongService.js';

// stateful parent component, which holds state data to be rendered in HTML
const SearchList = () => {
    // variables in the state to hold data
    const [songs, setSongs] = useState([]) // initial state: empty song list
    const [searchString, setSearchString] = useState(""); // just for holding form data to be submitted for search

    // flag in the state to watch for add updates
    const [search, setSearch] = useState(false) // search is initially false

    // add useEffect to run on page load to call getAllSongs to set the state array
    // so when user enters, it displays all songs, then searching filters by criteria
    useEffect(() => {
	    searchSongs("").then((songList) => {
		    setSongs(songList);
		    console.log(songs);
	    });
    },[]);

    // when the user changes the state var flag (i.e. onSubmit), useEffect to change state of songs
    useEffect(() => {
        if (search) {
            // make search call using SearchService GET method to update songs state array
            // setSearch(false);
            // look at lecture 14 MainList.js and LearnService.js
            // e.g.
	    if (!searchString){
            	searchSongs("").then((songList) => {
                	setSearch(false); // revert state var
                	// render the resulting list of songs from the axios request (i.e. the updated state)
                	setSongs(songList);
            	})
	    }
	    else{
            	searchSongs(searchString).then((songList) => {
                	setSearch(false); // revert state var
                	// render the resulting list of songs from the axios request (i.e. the updated state)
                	setSongs(songList);
            	})
	    }
        }
    }, [songs,searchString,search]); // dependency array (songs, search) triggers useEffect on change

    // trigger useEffect to update state with resulting song list on form submission
    const onSubmitHandler = (e) => {
        e.preventDefault(); // this is just to enable cancellation of form submission
        console.log("submitted: ", e.target);
        setSearch(true); // update state var flag to trigger useEffect
    };

    // keep track of changes to child input text
    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target); // log entire input
        // continuously update value to be searched on form submission:
        // this updates the form inputs with updated values when the input is changed,
        // based on the value tag attribute
        setSearchString(e.target.value);
    };

    return (
        <div>
            <SearchForm
                searchString={searchString}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
            {/* display each result */}
            {songs.length > 0 && (
		<ul>
			{songs.map((song) => (
				<li key={song.id}>
				<Link to={{pathname:`/songs/${song.id}`,state: {song: song}}}>
					<img className="list-image" src={song.album_image_url} width="2%" alt="album-cover"/> &#160;
					<b>{song.title}</b> &#160;
					Artist: {song.artist} &#160;
					Album: {song.album} &#160;
					Peak Rank: {song.peak_rank} &#160;
					Weeks on Billboard 100: {song.total_weeks_on_chart}
					<br />
					<br/>
				</Link>
				</li>
			))}
		</ul>
            )}
        </div>
    );
};

export default SearchList;
