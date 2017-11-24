import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/api/v1/';

class Api {
  getVehicles() {
    return axios.get(`${API_ENDPOINT}/vehicles.json`)
  };

  getVehicle(vehicleId) {
    return axios.get(`${API_ENDPOINT}/vehicles/${vehicleId}.json`)
  }

  createVehicle(vehicle) {
    return axios.post(`${API_ENDPOINT}/vehicles`, { vehicle: vehicle })
  };

  updateVehicle(vehicleId, vehicle) {
    return axios.put(`${API_ENDPOINT}/vehicles/${vehicleId}`, { vehicle: vehicle })
  };

  deleteVehicle(vehicleId) {
    return axios.delete(`${API_ENDPOINT}/vehicles/${vehicleId}`)
  };

  getServiceItems() {
    return axios.get(`${API_ENDPOINT}/service_items.json`)
  };

  createServiceItem(service_item) {
    return axios.post(`${API_ENDPOINT}/service_items`, { service_item: service_item })
  };

  getRides() {
    return axios.get(`${API_ENDPOINT}/rides.json`)
  }

  getRide(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}.json`)
  };

  createRide(ride) {
    return axios.post(`${API_ENDPOINT}/rides`, { ride: ride })
  };

  updateRide(rideId, ride) {
    return axios.put(`${API_ENDPOINT}/rides/${rideId}.json`, { ride: ride })
  };

  deleteRide(rideId) {
    return axios.delete(`${API_ENDPOINT}/rides/${rideId}`)
  };

  getRideServices(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}/services.json`)
  };

  getRideIntervals(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}/intervals.json`)
  };

  getRideServiceNotifications(rideId) {
    return axios.get(`${API_ENDPOINT}/rides/${rideId}/service_notifications.json`)
  };

  createRideService(rideId, service) {
    return axios.post(`${API_ENDPOINT}/rides/${rideId}/services`, { service: service })
  };
}

export default new Api();
