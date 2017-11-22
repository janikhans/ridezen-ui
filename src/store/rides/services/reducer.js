import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  servicesById: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.RIDE_SERVICES_FETCHED:
      return {
        ...state,
        servicesById: action.servicesBydId
      };
    case types.RIDE_SERVICES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.RIDE_SERVICES_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export function getServicesIdArray(state, rideId) {
  return _.keys(state.rides.ridesById[rideId].servicesById);
}

export function getServicesById(state, rideId) {
  return state.rides.ridesById[rideId].servicesById
}
