import _ from 'lodash';

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
