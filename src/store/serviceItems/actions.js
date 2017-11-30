import _ from 'lodash';
import { push } from 'react-router-redux';

import serviceItemsApi from '../../services/serviceItems';
import * as types from './actionTypes'

export function fetchServiceItems(args = {}) {
  return (dispatch) => {
    dispatch(serviceItemsIsLoading(true));
    serviceItemsApi.getServiceItems(args)
      .then((response) => {
        dispatch(serviceItemsIsLoading(false));
        const serviceItemsById = _.keyBy(response.data, (serviceItem) => serviceItem.id);
        dispatch(fetchServiceItemsSuccess(serviceItemsById))
      })
      .catch(() => {
        dispatch(serviceItemsIsLoading(false));
        dispatch(serviceItemsHasErrored(true))
      });
  };
}

export function fetchServiceItemInfo(serviceItemId) {
  return (dispatch) => {
    serviceItemsApi.getServiceItem(serviceItemId)
      .then((response) => {
        dispatch(fetchServiceItemInfoSuccess(serviceItemId, response.data))
      })
      .catch(error => {
        console.log(error)
      });
  };
}

export function deleteServiceItem(serviceItemId) {
  return (dispatch) => {
    serviceItemsApi.deleteServiceItem(serviceItemId)
      .then((response) => {
        dispatch(push('/service-items'))
        dispatch(deleteServiceItemSuccess(serviceItemId))
      })
      .catch((error) => console.log(error));
  };
}

function deleteServiceItemSuccess(serviceItemId) {
  return {
    type: types.SERVICE_ITEM_DELETED,
    serviceItemId
  };
}

export function updateServiceItem(serviceItem) {
  return {
    type: types.SERVICE_ITEM_UPDATED,
    serviceItem
  };
}

function fetchServiceItemInfoSuccess(serviceItemId, serviceItem) {
  return {
    type: types.SERVICE_ITEM_INFO_FETCHED,
    serviceItemId,
    serviceItem
  };
}

export function addServiceItem(serviceItem) {
  var serviceItemById = { [serviceItem.id]: serviceItem }
  return {
    type: types.SERVICE_ITEM_CREATED,
    serviceItemById
  }
}

export function serviceItemsHasErrored(bool) {
  return {
    type: types.SERVICE_ITEMS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function serviceItemsIsLoading(bool) {
  return {
    type: types.SERVICE_ITEMS_IS_LOADING,
    isLoading: bool
  };
}
export function fetchServiceItemsSuccess(serviceItemsById) {
  return {
    type: types.SERVICE_ITEMS_FETCHED,
    serviceItemsById,
    hasLoaded: true
  };
}
