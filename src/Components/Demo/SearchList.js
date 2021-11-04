import { useState, useEffect } from 'react';
import SearchForm from 'SearchForm.js';
import {searchSongs} from '../../src/Services/SongService.js';

// stateful parent component, which holds state data to be rendered in HTML
const SearchList = () => {
    // variables in the state to hold data
    const [songs, setSongs] = useState([]) // initial state: empty song list
    const [searchSong, setSearchSong] = useState({
        string: "",
        date: ""
    }); // just for holding form data to be submitted for search

    // flag in the state to watch for add updates
    const [search, setSearch] = useState(false) // search is initially false

    // when the user changes the state var flag (i.e. onSubmit), useEffect
    useEffect(() => {
        if (searchSong && search) {
            // TODO: make search call using SearchService GET method to update songs state array
            // TODO: setSearch(false);
            // look at lecture 14 MainList.js and LearnService.js
            // e.g.
            searchSongs(searchSong).then((songList) => {
                setSearch(false); // revert state var
                // render the resulting list of songs from the axios request (i.e. the updated state)
                setSongs(songList)
            })
        }
    }, [songs,searchSong,search]); // dependency array (songs, search) triggers useEffect on change

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
        // continuously update value to be searched on form submission
        // TODO: figure out what this is doing (from lecture 16 AuthRegister.js)
        const { name, value: newValue} = e.target;
        console.log(newValue);

        setSearchSong({
            ...searchSong,
            [name]: newValue
        });
        //setSearchSong(e.target.value); // old
    };

    return (
        <div>
            <SearchForm
                searchSong={searchSong}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
            {/* TODO: display each result */}
            {songs.length > 0 && (
                <ul>
                    {songs.map((song) =>
                        <li key={song.id}>{/*TODO: get, to display songinfo*/}
                            {/* e.g. {song.get("name")}*/}
                            Title: {song.title} 
                            Artist: {song.artist} 
                            Weeks on Billboard 100: {song.total_weeks_on_chart}
                            Peak Rank: {song.peak_rank}
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchList;