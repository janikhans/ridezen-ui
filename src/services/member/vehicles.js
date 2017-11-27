import client from '../client';

const BASE_URL = 'member/vehicles';

class VehiclesApi {
  getVehicles() {
    return client.get(`${BASE_URL}.json`)
  }

  getVehicle(vehicleId) {
    return client.get(`${BASE_URL}/${vehicleId}.json`)
  }

  createVehicle(vehicle) {
    return client.post(`${BASE_URL}`, { vehicle: vehicle })
  }

  updateVehicle(vehicleId, vehicle) {
    return client.put(`${BASE_URL}/${vehicleId}`, { vehicle: vehicle })
  }

  deleteVehicle(vehicleId) {
    return client.delete(`${BASE_URL}/${vehicleId}`)
  }

  getVehicleNegativeIntervals(vehicleId) {
    return client.get(`${BASE_URL}/${vehicleId}/negative_intervals.json`)
  }

  createVehicleNegativeInterval(vehicleId, negativeInterval) {
    return client.post(`${BASE_URL}/${vehicleId}/negative_intervals`, { negative_interval: negativeInterval })
  }

  deleteVehicleNegativeInterval(vehicleId, id) {
    return client.delete(`${BASE_URL}/${vehicleId}/negative_intervals/${id}`)
  }

  createVehicleOemInterval(vehicleId, oemInterval) {
    return client.post(`${BASE_URL}/${vehicleId}/oem_intervals`, { oem_interval: oemInterval })
  }

  deleteVehicleOemInterval(vehicleId, id) {
    return client.delete(`${BASE_URL}/${vehicleId}/oem_intervals/${id}`)
  }

  getVehicleIntervals(vehicleId) {
    return client.get(`${BASE_URL}/${vehicleId}/intervals.json`)
  }
}

export default new VehiclesApi();
