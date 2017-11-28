import _ from 'lodash';
import { push } from 'react-router-redux';

import organizationsApi from '../../services/organizations';
import * as types from './actionTypes'

export function fetchOrganizations() {
  return (dispatch) => {
    dispatch(organizationsIsLoading(true));
    organizationsApi.getOrganizations()
      .then((response) => {
        dispatch(organizationsIsLoading(false));
        const organizationsById = _.keyBy(response.data, (organization) => organization.id);
        dispatch(fetchOrganizationsSuccess(organizationsById))
      })
      .catch(() => {
        dispatch(organizationsIsLoading(false));
        dispatch(organizationsHasErrored(true))
      });
  };
}

export function fetchOrganizationInfo(organizationId) {
  return (dispatch) => {
    dispatch(organizationInfoIsLoading(organizationId, true));
    organizationsApi.getOrganization(organizationId)
      .then((response) => {
        dispatch(organizationInfoIsLoading(organizationId, false));
        dispatch(fetchOrganizationInfoSuccess(organizationId, response.data))
      })
      .catch(() => dispatch(organizationInfoHasErrored(organizationId, true)));
  };
}

export function updateOrganization(organization) {
  return {
    type: types.ORGANIZATION_UPDATED,
    organization
  };
}

export function addOrganization(organization) {
  var organizationById = { [organization.id]: organization }
  return {
    type: types.ORGANIZATION_ADDED,
    organizationById
  };
}

export function deleteOrganization(organizationId) {
  return (dispatch) => {
    organizationsApi.deleteOrganization(organizationId)
      .then((response) => {
        dispatch(deleteOrganizationSuccess(organizationId, true))
        dispatch(push('/organizations'))
      })
      .catch((error) => console.log(error));
  };
}

function deleteOrganizationSuccess(organizationId) {
  return {
    type: types.ORGANIZATION_DELETED,
    organizationId
  };
}

function organizationInfoHasErrored(organizationId, bool) {
  return {
    type: types.ORGANIZATION_INFO_HAS_ERRORED,
    organizationId,
    hasErrored: bool
  };
}

function organizationInfoIsLoading(organizationId, bool) {
  return {
    type: types.ORGANIZATION_INFO_IS_LOADING,
    organizationId,
    isLoading: bool
  };
}

function fetchOrganizationInfoSuccess(organizationId, organization) {
  return {
    type: types.ORGANIZATION_INFO_FETCHED,
    organizationId,
    organization
  };
}

export function organizationsHasErrored(bool) {
  return {
    type: types.ORGANIZATIONS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function organizationsIsLoading(bool) {
  return {
    type: types.ORGANIZATIONS_IS_LOADING,
    isLoading: bool
  };
}
export function fetchOrganizationsSuccess(organizationsById) {
  return {
    type: types.ORGANIZATIONS_FETCHED,
    organizationsById,
    hasLoaded: true
  };
}
