import client from './client';

class VehiclesApi {
  getVehicles() {
    return client.get(`vehicles.json`)
  };

  getVehicle(vehicleId) {
    return client.get(`vehicles/${vehicleId}.json`)
  }

  createVehicle(vehicle) {
    return client.post(`vehicles`, { vehicle: vehicle })
  };

  updateVehicle(vehicleId, vehicle) {
    return client.put(`vehicles/${vehicleId}`, { vehicle: vehicle })
  };

  deleteVehicle(vehicleId) {
    return client.delete(`vehicles/${vehicleId}`)
  };
}

export default new VehiclesApi();
