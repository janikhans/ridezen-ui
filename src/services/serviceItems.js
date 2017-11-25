import client from './client';

class ServiceItemsApi {
  getServiceItems() {
    return client.get(`service_items.json`)
  };

  createServiceItem(service_item) {
    return client.post(`service_items`, { service_item: service_item })
  };

  updateServiceItem(serviceItemId, serviceItem) {
    return client.put(`serviceItems/${serviceItemId}`, { serviceItem: serviceItem })
  };

  deleteServiceItem(serviceItemId) {
    return client.delete(`serviceItems/${serviceItemId}`)
  };
}

export default new ServiceItemsApi();
