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

  getServiceItemDefaultIntervals(serviceItemId) {
    return client.get(`${ADMIN_BASE}/${serviceItemId}/default_intervals.json`)
  }

  createServiceItemDefaultInterval(serviceItemId, defaultInterval) {
    return client.post(`${ADMIN_BASE}/${serviceItemId}/default_intervals`, { default_interval: defaultInterval })
  };

  updateServiceItemDefaultInterval(serviceItemId, defaultIntervalId, defaultInterval) {
    return client.put(`${ADMIN_BASE}/${serviceItemId}/default_intervals/${defaultIntervalId}`, { default_interval: defaultInterval })
  };

  deleteServiceItemDefaultInterval(serviceItemId, id) {
    return client.delete(`${ADMIN_BASE}/${serviceItemId}/default_intervals/${id}`)
  };
}

export default new ServiceItemsApi();
