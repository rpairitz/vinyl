import axios from 'axios';
import * as Env from "../environments";

// TODO: define const API_PATH var to hold abs path for the php file
const API_PATH = Env.API_PATH;

// would need to also break up in SearchForm.js and SearchList.js
export const searchSongs = (searchString) => {
    // register axios with onSubmit event to search the db
   // format params to JSON object to be sent using axios and received by PHP in proper format for decoding
   return axios.get(API_PATH, {params: {string: searchString}}).then((response) => {
       console.log(response);
       return response.data;
   })
   .catch((error) => {
       alert(`Error: ${error.message}`);
   });
};
