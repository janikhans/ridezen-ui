import client from './client';

const BASE_URL = 'rides';

class RidesApi {
  getRides() {
    return client.get(`${BASE_URL}.json`)
  }

  getRide(rideId) {
    return client.get(`${BASE_URL}/${rideId}.json`)
  };

  createRide(ride) {
    return client.post(`${BASE_URL}`, { ride: ride })
  };

  updateRide(rideId, ride) {
    return client.put(`${BASE_URL}/${rideId}`, { ride: ride })
  };

  deleteRide(rideId) {
    return client.delete(`${BASE_URL}/${rideId}`)
  };

  getRideServices(rideId) {
    return client.get(`${BASE_URL}/${rideId}/services.json`)
  };

  createRideService(rideId, service) {
    return client.post(`${BASE_URL}/${rideId}/services`, { service: service })
  };

  getRideIntervals(rideId) {
    return client.get(`${BASE_URL}/${rideId}/intervals.json`)
  };

  getRideServiceNotifications(rideId) {
    return client.get(`${BASE_URL}/${rideId}/service_notifications.json`)
  };

  getRideFillUps(rideId) {
    return client.get(`${BASE_URL}/${rideId}/fill_ups.json`)
  };

  createRideFillUp(rideId, fillUp) {
    return client.post(`${BASE_URL}/${rideId}/fill_ups`, { fill_up: fillUp })
  };

  deleteRideFillUp(rideId, fillUpId) {
    return client.delete(`${BASE_URL}/${rideId}/fill_ups/${fillUpId}`)
  };
}

export default new RidesApi();
