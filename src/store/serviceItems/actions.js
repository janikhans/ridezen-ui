import _ from 'lodash';

import apiService from '../../services/api';
import * as types from './actionTypes'

export function fetchServiceItems() {
  return (dispatch) => {
    dispatch(serviceItemsIsLoading(true));
    apiService.getServiceItems()
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

export function createServiceItem(serviceItem) {
  return (dispatch) => {
    dispatch(serviceItemsIsSaving(true));
    apiService.createServiceItem(serviceItem)
      .then((response) => {
        dispatch(serviceItemsIsSaving(false));
        dispatch(createServiceItemSuccess(response.data))
      })
      .catch((error) => {
        dispatch(serviceItemsIsSaving(false));
        dispatch(createServiceItemHasErrored(error.response.data))
      });
  };
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

export function createServiceItemHasErrored(errors) {
  return {
    type: types.CREATE_SERVICE_ITEM_HAS_ERRORED,
    errors: errors
  };
}
export function serviceItemsIsSaving(bool) {
  return {
    type: types.SERVICE_ITEM_IS_SAVING,
    isLoading: bool
  };
}
export function createServiceItemSuccess(serviceItemById) {
  return {
    type: types.CREATED_SERVICE_ITEM,
    serviceItemById
  };
}
