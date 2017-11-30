import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  hasLoaded: false,
  vehicleTypesById: []
}

export default function reduce(state = initialState, action = {}) {
  var newVehicleTypesById = state.vehicleTypesById
  switch (action.type) {
    case types.VEHICLE_TYPES_FETCHED:
      return {
        ...state,
        vehicleTypesById: action.vehicleTypesById,
        hasLoaded: action.hasLoaded
      };
    case types.VEHICLE_TYPES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.VEHICLE_TYPES_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case types.VEHICLE_TYPE_CREATED:
      return {
        ...state,
        vehicleTypesById: Object.assign({}, state.vehicleTypesById, action.vehicleTypeById)
      };
    case types.VEHICLE_TYPE_UPDATED:
      newVehicleTypesById[action.vehicleType.id] = action.vehicleType
      return {
        ...state,
        vehicleTypesById: newVehicleTypesById
      };
    case types.VEHICLE_TYPE_DELETED:
      newVehicleTypesById = _.omit(newVehicleTypesById, action.vehicleTypeId)
      return {
        ...state,
        vehicleTypesById: newVehicleTypesById
      };
    default:
      return state;
  }
}

// Selectors
export function getVehicleTypesById(state) {
  return state.vehicleTypes.vehicleTypesById;
}

export function getVehicleTypesIdArray(state) {
  return _.keys(state.vehicleTypes.vehicleTypesById);
}

export function getVehicleTypes(state) {
  return _.values(state.vehicleTypes.vehicleTypesById);
}

export function isVehicleTypesLoaded(state) {
  return state.vehicleTypes.hasLoaded
}
