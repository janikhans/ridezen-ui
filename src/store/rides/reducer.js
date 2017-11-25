import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  hasLoaded: false,
  ridesById: []
}

export default function ridesReducer(state = initialState, action = {}) {
  var newRidesById = state.ridesById
  switch (action.type) {
    case types.RIDES_FETCHED:
      return {
        ...state,
        ridesById: action.ridesById,
        hasLoaded: action.hasLoaded
      };
    case types.RIDES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.RIDES_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
      case types.RIDE_INFO_FETCHED:
        newRidesById[action.rideId] = Object.assign({}, newRidesById[action.rideId], action.ride)
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_INFO_HAS_ERRORED:
        newRidesById[action.rideId] = Object.assign({}, newRidesById[action.rideId], {hasErrored: action.hasErrored})
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_INFO_IS_LOADING:
        newRidesById[action.rideId] = Object.assign({}, newRidesById[action.rideId], {isLoading: action.isLoading})
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_CREATED:
        return {
          ...state,
          ridesById: Object.assign({}, state.ridesById, action.rideById)
        };
      case types.RIDE_UPDATED:
        var ride = action.ride
        newRidesById[ride.id] = Object.assign({}, newRidesById[ride.id], action.ride)
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_DELETED:
        _.omit(newRidesById, action.rideId);
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_SERVICES_FETCHED:
        newRidesById[action.rideId] = Object.assign({}, newRidesById[action.rideId], {servicesById: action.servicesById})
        return {
          ...state,
          ridesById: newRidesById
        };
      case types.RIDE_SERVICE_ADDED:
        var servicesById = newRidesById[action.rideId].servicesById
        servicesById = Object.assign({}, servicesById, action.serviceById)
        newRidesById[action.rideId].servicesById = servicesById
        return {
          ...state,
          ridesById: newRidesById
        };
    default:
      return state;
  }
}

// Selectors
export function getRidesById(state) {
  return state.rides.ridesById;
}

export function getRidesIdArray(state) {
  return _.keys(state.rides.ridesById);
}

export function getRideById(state, rideId) {
  return state.rides.ridesById[rideId];
}

export function isRidesLoaded(state) {
  return state.rides.hasLoaded
}
