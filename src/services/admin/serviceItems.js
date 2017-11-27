import client from './client';

class ServiceItemsApi {
  getServiceItems() {
    return client.get(`admin/service_items.json`)
  };

  createServiceItem(service_item) {
    return client.post(`admin/service_items`, { service_item: service_item })
  };

  updateServiceItem(serviceItemId, serviceItem) {
    return client.put(`admin/serviceItems/${serviceItemId}`, { serviceItem: serviceItem })
  };

  deleteServiceItem(serviceItemId) {
    return client.delete(`admin/serviceItems/${serviceItemId}`)
  };
}

export default new ServiceItemsApi();
