import _ from 'lodash';

import vehicleTypesApi from '../../services/vehicleTypes';
import * as types from './actionTypes'

export function fetchVehicleTypes(args = {}) {
  return (dispatch) => {
    dispatch(vehicleTypesIsLoading(true));
    vehicleTypesApi.getVehicleTypes(args)
      .then((response) => {
        dispatch(vehicleTypesIsLoading(false));
        const vehicleTypesById = _.keyBy(response.data, (vehicleType) => vehicleType.id);
        dispatch(fetchVehicleTypesSuccess(vehicleTypesById))
      })
      .catch(() => {
        dispatch(vehicleTypesIsLoading(false));
        dispatch(vehicleTypesHasErrored(true))
      });
  };
}

export function deleteVehicleType(vehicleTypeId) {
  return (dispatch) => {
    vehicleTypesApi.deleteVehicleType(vehicleTypeId)
      .then((response) => {
        dispatch(deleteVehicleTypeSuccess(vehicleTypeId))
      })
      .catch((error) => console.log(error));
  };
}

export function updateVehicleType(vehicleType) {
  return {
    type: types.VEHICLE_TYPE_UPDATED,
    vehicleType
  };
}

export function addVehicleType(vehicleType) {
  var vehicleTypeById = { [vehicleType.id]: vehicleType }
  return {
    type: types.VEHICLE_TYPE_CREATED,
    vehicleTypeById
  }
}

function deleteVehicleTypeSuccess(vehicleTypeId) {
  return {
    type: types.VEHICLE_TYPE_DELETED,
    vehicleTypeId
  };
}

export function vehicleTypesHasErrored(bool) {
  return {
    type: types.VEHICLE_TYPES_HAS_ERRORED,
    hasErrored: bool
  };
}
export function vehicleTypesIsLoading(bool) {
  return {
    type: types.VEHICLE_TYPES_IS_LOADING,
    isLoading: bool
  };
}
export function fetchVehicleTypesSuccess(vehicleTypesById) {
  return {
    type: types.VEHICLE_TYPES_FETCHED,
    vehicleTypesById,
    hasLoaded: true
  };
}
