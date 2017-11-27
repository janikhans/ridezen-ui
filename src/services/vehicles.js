import client from './client';

const BASE = 'vehicles';
const ADMIN_BASE = `admin/${BASE}`

class VehiclesApi {
  getVehicles(args = {}) {
    const url = args.admin ? ADMIN_BASE : BASE
    return client.get(`${url}.json`)
  }

  createVehicle(vehicle) {
    return client.post(`${BASE}`, { vehicle: vehicle })
  }

  getVehicle(vehicleId) {
    return client.get(`${ADMIN_BASE}/${vehicleId}.json`)
  };

  updateVehicle(vehicleId, vehicle) {
    return client.put(`${ADMIN_BASE}/${vehicleId}`, { vehicle: vehicle })
  };

  deleteVehicle(vehicleId) {
    return client.delete(`${ADMIN_BASE}/${vehicleId}`)
  };

  getVehicleNegativeIntervals(vehicleId) {
    return client.get(`${ADMIN_BASE}/${vehicleId}/negative_intervals.json`)
  }

  createVehicleNegativeInterval(vehicleId, negativeInterval) {
    return client.post(`${ADMIN_BASE}/${vehicleId}/negative_intervals`, { negative_interval: negativeInterval })
  };

  deleteVehicleNegativeInterval(vehicleId, id) {
    return client.delete(`${ADMIN_BASE}/${vehicleId}/negative_intervals/${id}`)
  };

  createVehicleOemInterval(vehicleId, oemInterval) {
    return client.post(`${ADMIN_BASE}/${vehicleId}/oem_intervals`, { oem_interval: oemInterval })
  };

  deleteVehicleOemInterval(vehicleId, id) {
    return client.delete(`${ADMIN_BASE}/${vehicleId}/oem_intervals/${id}`)
  };

  getVehicleIntervals(vehicleId) {
    return client.get(`${ADMIN_BASE}/${vehicleId}/intervals.json`)
  };
}

export default new VehiclesApi();
