import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api/v1/';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    'token-type': localStorage.getItem('token-type'),
    expiry: localStorage.getItem('expiry'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  }
}

class Api {

  get(url) {
    return axios.get(`${API_ENDPOINT}/${url}`, config)
  }

  post(url, object) {
    return axios.post(`${API_ENDPOINT}/${url}`, object, config)
  }

  put(url, object) {
    return axios.put(`${API_ENDPOINT}/${url}`, object, config)
  };

  delete(url) {
    return axios.delete(`${API_ENDPOINT}/${url}`, config)
  };
}

export default new Api();
