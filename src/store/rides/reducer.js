import * as types from './actionTypes';
import _ from 'lodash';
import { fetchRideServices } from './services/reducer'

const initialState = {
  hasErrored: false,
  isLoading: false,
  ridesById: []
}

export default function ridesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RIDES_FETCHED:
      return {
        ...state,
        ridesById: action.ridesById
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
        var ridesById = state.ridesById
        ridesById[action.rideId] = Object.assign({}, ridesById[action.rideId], action.ride)
        return {
          ...state,
          ridesById: ridesById
        };
      case types.RIDE_INFO_HAS_ERRORED:
        var ridesById = state.ridesById
        ridesById[action.rideId] = Object.assign({}, ridesById[action.rideId], {hasErrored: action.hasErrored})
        return {
          ...state,
          ridesById: ridesById
        };
      case types.RIDE_INFO_IS_LOADING:
        var ridesById = state.ridesById
        ridesById[action.rideId] = Object.assign({}, ridesById[action.rideId], {isLoading: action.isLoading})
        return {
          ...state,
          ridesById: ridesById
        };
      case types.RIDE_DELETED:
        var ridesById = state.ridesById
        _.omit(ridesById, action.rideId);
        return {
          ...state,
          ridesById: ridesById
        };
      case types.RIDE_SERVICES_FETCHED:
        var ridesById = state.ridesById
        ridesById[action.rideId] = Object.assign({}, ridesById[action.rideId], {servicesById: action.servicesById})
        return {
          ...state,
          ridesById: ridesById
        };
    default:
      return state;
  }
}

// Selectors
export function getRidesIdArray(state) {
  return _.keys(state.rides.ridesById);
}

export function getRideById(state, rideId) {
  return state.rides.ridesById[rideId];
}
