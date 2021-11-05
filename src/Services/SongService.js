import axios from 'axios';
import * as Env from "../environments";

// TODO: define const API_PATH var to hold abs path for the php file
const API_PATH = Env.API_PATH;

// TODO: break into two functions: one for song title/artist, one for date
// would need to also break up in SearchForm.js and SearchList.js
export const searchSongs = (searchSong) => {
    // TODO: register axios with onSubmit event to search the db
   return axios.get(API_PATH, searchSong).then((response) => {
       console.log(response);
       return response.data;
   });
};