import client from './client';

class RidesApi {
  getRides() {
    return client.get(`rides.json`)
  }

  getRide(rideId) {
    return client.get(`rides/${rideId}.json`)
  };

  createRide(ride) {
    return client.post(`rides`, { ride: ride })
  };

  updateRide(rideId, ride) {
    return client.put(`rides/${rideId}`, { ride: ride })
  };

  deleteRide(rideId) {
    return client.delete(`rides/${rideId}`)
  };

  getRideServices(rideId) {
    return client.get(`rides/${rideId}/services.json`)
  };

  createRideService(rideId, service) {
    return client.post(`rides/${rideId}/services`, { service: service })
  };

  getRideIntervals(rideId) {
    return client.get(`rides/${rideId}/intervals.json`)
  };

  getRideServiceNotifications(rideId) {
    return client.get(`rides/${rideId}/service_notifications.json`)
  };
}

export default new RidesApi();
