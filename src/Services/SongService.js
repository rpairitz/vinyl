import axios from 'axios';
import * as Env from "../environments";

// TODO: define const API_PATH var to hold abs path for the php file
const API_PATH = Env.API_PATH;

// TODO: break into two functions: one for song title/artist, one for date
// would need to also break up in SearchForm.js and SearchList.js
export const searchSongs = (searchSong) => {
    // TODO: register axios with onSubmit event to search the db
   // format params to JSON object to be sent using axios and received by PHP in proper format for decoding
   //var params = new URLSearchParams();
   //params.append('string', searchSong.string);
   // try to test axios API
   /*
   return jest.mock('axios').test('Example',async() => {
	   axios.get.mockImplementation(API_PATH);
   });
   */
   return axios.get(API_PATH, {params: {string: searchSong.string}}).then((response) => {
       console.log(response);
       return response.data;
   })
   .catch((error) => {
       alert(`Error: ${error.message}`);
   });
};
