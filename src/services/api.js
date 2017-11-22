import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api/v1/';

class Api {

  getRides() {
    return axios.get(`${API_ENDPOINT}/rides.json`)
  }

  getVehicles() {
    return axios.get(`${API_ENDPOINT}/vehicles.json`)
  };

  getServiceItems() {
    return axios.get(`${API_ENDPOINT}/service_items.json`)
  };

  createServiceItem(service_item) {
    return axios.post(`${API_ENDPOINT}/service_items`, { service_item: service_item })
  };

  getServices(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}/services.json`)
  };

  getRide(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}.json`)
  };

  deleteRide(rideId) {
    return axios.delete(`${API_ENDPOINT}/rides/${rideId}`)
  };
}

export default new Api();
