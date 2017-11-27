import client from '../client';

const BASE_URL = 'member/service_items';

class ServiceItemsApi {
  getServiceItems() {
    return client.get(`${BASE_URL}.json`)
  };

  createServiceItem(serviceItem) {
    return client.post(`${BASE_URL}`, { service_item: serviceItem })
  };

  getServiceItem(serviceItemId) {
    return client.get(`${BASE_URL}/${serviceItemId}.json`)
  };

  updateServiceItem(serviceItemId, serviceItem) {
    return client.put(`${BASE_URL}/${serviceItemId}`, { service_item: serviceItem })
  };

  deleteServiceItem(serviceItemId) {
    return client.delete(`${BASE_URL}/${serviceItemId}`)
  };
}

export default new ServiceItemsApi();
