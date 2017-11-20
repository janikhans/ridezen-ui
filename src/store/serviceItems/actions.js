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
      .catch(() => dispatch(serviceItemsHasErrored(true)));
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
    serviceItemsById
  };
}