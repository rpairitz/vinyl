import axios from 'axios';
import * as Env from "../environments";

// API_PATH var to hold backend endpoint 
const API_PATH = Env.RECS_API_PATH;

export const getRecommended = (songId) => {
   // use axios to interface with backend to issue queries and retrieve async data from db
   // format params to JSON object to be sent using axios and received by PHP in proper format for decoding
   return axios.get(API_PATH, {params: {id: songId}}).then((response) => {
       console.log(response);
       return response.data;
   })
   .catch((error) => {
       alert(`Error: ${error.message}`);
   });
};
