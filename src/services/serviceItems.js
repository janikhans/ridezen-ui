import client from './client';

const BASE = 'service_items';
const ADMIN_BASE = `admin/${BASE}`

class ServiceItemsApi {
  getServiceItems(args = {}) {
    const url = args.admin ? ADMIN_BASE : BASE
    return client.get(`${url}.json`)
  };

  createServiceItem(serviceItem) {
    return client.post(`${BASE}`, { service_item: serviceItem })
  };

  getServiceItem(serviceItemId) {
    return client.get(`${ADMIN_BASE}/${serviceItemId}.json`)
  };

  updateServiceItem(serviceItemId, serviceItem) {
    return client.put(`${ADMIN_BASE}/${serviceItemId}`, { service_item: serviceItem })
  };

  deleteServiceItem(serviceItemId) {
    return client.delete(`${ADMIN_BASE}/${serviceItemId}`)
  };
}

export default new ServiceItemsApi();
