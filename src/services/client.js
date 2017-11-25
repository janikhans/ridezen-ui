import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api/v1/';

class Api {

  get(url) {
    return axios.get(`${API_ENDPOINT}/${url}`)
  }

  post(url, object) {
    return axios.post(`${API_ENDPOINT}/${url}`, object)
  }

  put(url, object) {
    return axios.put(`${API_ENDPOINT}/${url}`, object)
  };

  delete(url) {
    return axios.delete(`${API_ENDPOINT}/${url}`)
  };
}

export default new Api();
