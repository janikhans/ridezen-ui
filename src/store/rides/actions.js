import _ from 'lodash';
import { push } from 'react-router-redux';

import apiService from '../../services/api';
import * as types from './actionTypes'

// Related to all rides for user
export function fetchRides() {
  return (dispatch) => {
    dispatch(ridesIsLoading(true));
    apiService.getRides()
      .then((response) => {
        dispatch(ridesIsLoading(false));
        const ridesById = _.keyBy(response.data, (ride) => ride.id);
        dispatch(fetchRidesSuccess(ridesById))
      })
      .catch(() => dispatch(ridesHasErrored(true)));
  };
}

export function ridesHasErrored(bool) {
  return {
    type: types.RIDES_HAS_ERRORED,
    hasErrored: bool
  };
}
export function ridesIsLoading(bool) {
  return {
    type: types.RIDES_IS_LOADING,
    isLoading: bool
  };
}
export function fetchRidesSuccess(ridesById) {
  return {
    type: types.RIDES_FETCHED,
    ridesById
  };
}

export function fetchRideInfo(rideId) {
  return (dispatch) => {
    dispatch(rideInfoIsLoading(rideId, true));
    apiService.getRide(rideId)
      .then((response) => {
        dispatch(rideInfoIsLoading(rideId, false));
        dispatch(fetchRideInfoSuccess(rideId, response.data))
      })
      .catch(() => dispatch(rideInfoHasErrored(rideId, true)));
  };
}

export function rideInfoHasErrored(rideId, bool) {
  return {
    type: types.RIDE_INFO_HAS_ERRORED,
    rideId,
    hasErrored: bool
  };
}
export function rideInfoIsLoading(rideId, bool) {
  return {
    type: types.RIDE_INFO_IS_LOADING,
    rideId,
    isLoading: bool
  };
}
export function fetchRideInfoSuccess(rideId, ride) {
  return {
    type: types.RIDE_INFO_FETCHED,
    rideId,
    ride
  };
}

export function deleteRide(rideId) {
  return (dispatch) => {
    apiService.deleteRide(rideId)
      .then((response) => {
        dispatch(deleteRideSuccess(rideId, true))
        dispatch(push('/garage'))
      })
      .catch((error) => console.log(error));
  };
}

export function deleteRideSuccess(rideId, redirect) {
  return {
    type: types.RIDE_DELETED,
    redirect,
    rideId
  };
}

export function fetchRideServices(rideId) {
  return (dispatch) => {
    apiService.getRideServices(rideId)
      .then((response) => {
        const servicesById = _.keyBy(response.data, (service) => service.id);
        dispatch(fetchRideServicesSuccess(rideId, servicesById))
      })
      .catch((error) => console.log(error));
  };
}

export function fetchRideServicesSuccess(rideId, servicesById) {
  return {
    type: types.RIDE_SERVICES_FETCHED,
    rideId,
    servicesById
  };
}
