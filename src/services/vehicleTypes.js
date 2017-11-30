import client from './client';

const BASE = 'vehicle_types';
const ADMIN_BASE = `admin/${BASE}`

class VehicleTypesApi {
  getVehicleTypes() {
    return client.get(`${BASE}.json`)
  };

  createVehicleType(vehicleType) {
    return client.post(`${ADMIN_BASE}`, { vehicle_type: vehicleType })
  };

  getVehicleType(vehicleTypeId) {
    return client.get(`${ADMIN_BASE}/${vehicleTypeId}.json`)
  };

  updateVehicleType(vehicleTypeId, vehicleType) {
    return client.put(`${ADMIN_BASE}/${vehicleTypeId}`, { vehicle_type: vehicleType })
  };

  deleteVehicleType(vehicleTypeId) {
    return client.delete(`${ADMIN_BASE}/${vehicleTypeId}`)
  };
}

export default new VehicleTypesApi();
