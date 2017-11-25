import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  hasLoaded: false,
  vehiclesById: []
}

export default function vehiclesReducer(state = initialState, action = {}) {
  var newVehiclesById = state.vehiclesById
  switch (action.type) {
    case types.VEHICLES_FETCHED:
      return {
        ...state,
        vehiclesById: action.vehiclesById,
        hasLoaded: action.hasLoaded
      };
    case types.VEHICLES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.VEHICLES_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
      case types.VEHICLE_INFO_FETCHED:
        newVehiclesById[action.vehicleId] = Object.assign({}, newVehiclesById[action.vehicleId], action.vehicle)
        return {
          ...state,
          vehiclesById: newVehiclesById
        };
      case types.VEHICLE_INFO_HAS_ERRORED:
        newVehiclesById[action.vehicleId] = Object.assign({}, newVehiclesById[action.vehicleId], {hasErrored: action.hasErrored})
        return {
          ...state,
          vehiclesById: newVehiclesById
        };
      case types.VEHICLE_INFO_IS_LOADING:
        newVehiclesById[action.vehicleId] = Object.assign({}, newVehiclesById[action.vehicleId], {isLoading: action.isLoading})
        return {
          ...state,
          vehiclesById: newVehiclesById
        };
      case types.VEHICLE_CREATED:
        return {
          ...state,
          vehiclesById: Object.assign({}, state.vehiclesById, action.vehicleById)
        };
      case types.VEHICLE_UPDATED:
        var vehicle = action.vehicle
        newVehiclesById[vehicle.id] = Object.assign({}, newVehiclesById[vehicle.id], action.vehicle)
        return {
          ...state,
          vehiclesById: newVehiclesById
        };
      case types.VEHICLE_DELETED:
        _.omit(newVehiclesById, action.vehicleId);
        return {
          ...state,
          vehiclesById: newVehiclesById
        };
    default:
      return state;
  }
}

// Selectors
export function getVehiclesIdArray(state) {
  return _.keys(state.vehicles.vehiclesById);
}

export function getVehicleById(state, vehicleId) {
  return state.vehicles.vehiclesById[vehicleId];
}

export function getVehiclesById(state) {
  return state.vehicles.vehiclesById;
}

export function isVehiclesLoaded(state) {
  return state.vehicles.hasLoaded;
}
