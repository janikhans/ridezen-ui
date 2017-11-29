import client from './client';

const BASE_URL = 'organizations';

class OrganizationsApi {
  getOrganizations() {
    return client.get(`${BASE_URL}.json`)
  }

  getOrganization(organizationId) {
    return client.get(`${BASE_URL}/${organizationId}.json`)
  };

  createOrganization(organization) {
    return client.post(`${BASE_URL}`, { organization: organization })
  };

  updateOrganization(organizationId, organization) {
    return client.put(`${BASE_URL}/${organizationId}`, { organization: organization })
  };

  deleteOrganization(organizationId) {
    return client.delete(`${BASE_URL}/${organizationId}`)
  };

  getOrganizationMemberships(organizationId) {
    return client.get(`${BASE_URL}/${organizationId}/memberships.json`)
  };

  createOrganizationMembership(organizationId, membership) {
    return client.post(`${BASE_URL}/${organizationId}/memberships`, { membership: membership })
  };

  deleteOrganizationMembership(organizationId, membershipId) {
    return client.delete(`${BASE_URL}/${organizationId}/memberships/${membershipId}`)
  };

  getOrganizationRides(organizationId) {
    return client.get(`${BASE_URL}/${organizationId}/rides.json`)
  }

  createOrganizationRide(organizationId, ride) {
    return client.post(`${BASE_URL}/${organizationId}/rides`, { ride: ride })
  };
}

export default new OrganizationsApi();
