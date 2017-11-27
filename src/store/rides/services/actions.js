import _ from 'lodash';

import ridesApi from '../../../services/member/rides';
import * as types from './actionTypes'

// Fetch Services for a given ride
export function fetchRideServices(rideId) {
  return (dispatch) => {
    dispatch(rideServicesIsLoading(rideId, true));
    ridesApi.getRideServices(rideId)
      .then((response) => {
        dispatch(rideServicesIsLoading(rideId, false));
        const servicesById = _.keyBy(response.data, (service) => service.id);
        dispatch(fetchRideServicesSuccess(rideId, servicesById))
      })
      .catch(() => dispatch(rideServicesHasErrored(rideId, true)));
  };
}

export function rideServicesHasErrored(rideId, bool) {
  return {
    type: types.RIDE_SERVICES_HAS_ERRORED,
    rideId,
    hasErrored: bool
  };
}
export function rideServicesIsLoading(rideId, bool) {
  return {
    type: types.RIDE_SERVICES_IS_LOADING,
    rideId,
    isLoading: bool
  };
}
export function fetchRideServicesSuccess(rideId, servicesById) {
  return {
    type: types.RIDE_SERVICES_FETCHED,
    rideId,
    servicesById
  };
}
