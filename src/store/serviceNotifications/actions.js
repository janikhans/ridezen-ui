import _ from 'lodash';

import apiService from '../../services/api';
import * as types from './actionTypes'

// Fetch Intervals for a given ride
export function fetchRideServiceNotifications(rideId) {
  return (dispatch) => {
    dispatch(rideServiceNotificationsIsLoading(true));
    apiService.getRideServiceNotifications(rideId)
      .then((response) => {
        dispatch(rideServiceNotificationsIsLoading(false));
        const serviceNotificationsById = _.keyBy(response.data, (notification) => notification.ride_id + '_' + notification.service_item_id);
        dispatch(fetchRideServiceNotificationsSuccess(serviceNotificationsById))
      })
      .catch(() => dispatch(rideServiceNotificationsHasErrored(true)));
  };
}

export function rideServiceNotificationsHasErrored(bool) {
  return {
    type: types.SERVICE_NOTIFICATIONS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function rideServiceNotificationsIsLoading(bool) {
  return {
    type: types.SERVICE_NOTIFICATIONS_IS_LOADING,
    isLoading: bool
  };
}
export function fetchRideServiceNotificationsSuccess(serviceNotificationsById) {
  return {
    type: types.SERVICE_NOTIFICATIONS_FETCHED,
    serviceNotificationsById
  };
}
