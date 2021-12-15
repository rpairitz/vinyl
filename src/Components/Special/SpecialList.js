import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import SpecialForm from './SpecialForm.js';
import {getPrediction} from '../../Services/SpecialService.js';

// stateful parent component, which holds state data to be rendered in HTML
const SpecialList = () => {
    // variables in the state to hold data
    const [songs, setSongs] = useState([]) // predicted songs; initial state: empty song list
    const [info, setInfo] = useState({
	    string: "",
	    date: ""
    }); // just for holding form data to be submitted to get prediction 

    // flag in the state to watch for add updates
    const [predict, setPredict] = useState(false) // search is initially false

    // when the user changes the state var flag (i.e. onSubmit), useEffect to change state of songs
    useEffect(() => {
        if (predict) {
            // use SpecialService GET method to update prediction state array
            getPrediction(info).then((songList) => {
                	setPredict(false); // revert state var
                	// render the resulting list of songs from the axios request (i.e. the updated state)
                	setSongs(songList);
            })
        }
    }, [songs,info,predict]); // dependency array (songs, search) triggers useEffect on change

    // trigger useEffect to update state with resulting song list on form submission
    const onSubmitHandler = (e) => {
        e.preventDefault(); // this is just to enable cancellation of form submission
        setPredict(true); // update state var flag to trigger useEffect
    };

    // keep track of changes to child input text
    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target); // log entire input
        // continuously update the state with updates to form
        // this updates the state info object, by attribute name, with updated values when the form is changed,
        // based on the associated value attribute
	const {name, value: newValue} = e.target;
	setInfo({
		...info,
		[name]: newValue
	});
    };

    return (
        <div>
            <SpecialForm
                info={info}
                onChange={onChangeHandler}
                onSubmit={onSubmitHandler}
            />
            {/* display each result */}
            {songs.length > 0 ? (
		<>
		<h2 className="special-title">Your parents may have gotten down to</h2>
		<ul className="song-list">
			{songs.map((song) => (
				<li className="item-container" key={song.id}>
				{/*
				<iframe src={`https://open.spotify.com/embed/track/${song.id}+"?utm_source=generator" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>
				*/}
					<h3>{song.name} — {song.artist}</h3>
				</li>
			))}
		</ul>
		</>
            ):<p>No Results</p>}
        </div>
    );
};

export default SpecialList;
