import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api/v1/';

class Api {

  getRides() {
    return axios.get(`${API_ENDPOINT}/rides.json`)
  }
  
  // getVehicles() {
  //   return axios.get(`${API_ENDPOINT}/vehicles.json`)
  // };
}

export default new Api();