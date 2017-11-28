import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  isSaving: false,
  hasErrored: false,
  isLoading: false,
  hasLoaded: false,
  organizationsById: []
}

export default function reduce(state = initialState, action = {}) {
  var newOrganizationsById = state.organizationsById
  switch (action.type) {
    case types.ORGANIZATIONS_FETCHED:
      return {
        ...state,
        organizationsById: action.organizationsById,
        hasLoaded: action.hasLoaded
      };
    case types.ORGANIZATIONS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.ORGANIZATIONS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case types.ORGANIZATION_ADDED:
      return {
        ...state,
        organizationsById: Object.assign({}, newOrganizationsById, action.organizationById)
      };
    case types.ORGANIZATION_INFO_FETCHED:
      newOrganizationsById[action.organizationId] = Object.assign({}, newOrganizationsById[action.organizationId], action.organization)
      return {
        ...state,
        organizationsById: newOrganizationsById
      };
    case types.ORGANIZATION_INFO_HAS_ERRORED:
      newOrganizationsById[action.organizationId] = Object.assign({}, newOrganizationsById[action.organizationId], {hasErrored: action.hasErrored})
      return {
        ...state,
        organizationsById: newOrganizationsById
      };
    case types.ORGANIZATION_INFO_IS_LOADING:
      newOrganizationsById[action.organizationId] = Object.assign({}, newOrganizationsById[action.organizationId], {isLoading: action.isLoading})
      return {
        ...state,
        organizationsById: newOrganizationsById
      };
    case types.ORGANIZATION_UPDATED:
      var organization = action.organization
      newOrganizationsById[organization.id] = Object.assign({}, newOrganizationsById[organization.id], action.organization)
      return {
        ...state,
        organizationsById: newOrganizationsById
      };
    case types.ORGANIZATION_DELETED:
      var organizations = _.omit(newOrganizationsById, action.organizationId);
      return {
        ...state,
        organizationsById: organizations
      };
    default:
      return state;
  }
}

// Selectors
export function getOrganizationsById(state) {
  return state.organizations.organizationsById;
}

export function getOrganizationsIdArray(state) {
  return _.keys(state.organizations.organizationsById);
}

export function getOrganizations(state) {
  return _.values(state.organizations.organizationsById);
}

export function isOrganizationsLoaded(state) {
  return state.organizations.hasLoaded
}

export function getOrganizationById(state, organizationId) {
  return state.organizations.organizationsById[organizationId];
}
