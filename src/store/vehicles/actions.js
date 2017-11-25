import _ from 'lodash';
import { push } from 'react-router-redux';

import vehiclesApi from '../../services/vehicles';
import * as types from './actionTypes'

// Related to all vehicles for user
export function fetchVehicles() {
  return (dispatch) => {
    dispatch(vehiclesIsLoading(true));
    vehiclesApi.getVehicles()
      .then((response) => {
        dispatch(vehiclesIsLoading(false));
        const vehiclesById = _.keyBy(response.data, (vehicle) => vehicle.id);
        dispatch(fetchVehiclesSuccess(vehiclesById))
      })
      .catch(() => dispatch(vehiclesHasErrored(true)));
  };
}

function vehiclesHasErrored(bool) {
  return {
    type: types.VEHICLES_HAS_ERRORED,
    hasErrored: bool
  };
}

function vehiclesIsLoading(bool) {
  return {
    type: types.VEHICLES_IS_LOADING,
    isLoading: bool
  };
}

function fetchVehiclesSuccess(vehiclesById) {
  return {
    type: types.VEHICLES_FETCHED,
    vehiclesById,
    hasLoaded: true
  };
}

export function fetchVehicleInfo(vehicleId) {
  return (dispatch) => {
    dispatch(vehicleInfoIsLoading(vehicleId, true));
    vehiclesApi.getVehicle(vehicleId)
      .then((response) => {
        dispatch(vehicleInfoIsLoading(vehicleId, false));
        dispatch(fetchVehicleInfoSuccess(vehicleId, response.data))
      })
      .catch(() => dispatch(vehicleInfoHasErrored(vehicleId, true)));
  };
}

function vehicleInfoHasErrored(vehicleId, bool) {
  return {
    type: types.VEHICLE_INFO_HAS_ERRORED,
    vehicleId,
    hasErrored: bool
  };
}
function vehicleInfoIsLoading(vehicleId, bool) {
  return {
    type: types.VEHICLE_INFO_IS_LOADING,
    vehicleId,
    isLoading: bool
  };
}
function fetchVehicleInfoSuccess(vehicleId, vehicle) {
  return {
    type: types.VEHICLE_INFO_FETCHED,
    vehicleId,
    vehicle
  };
}

export function deleteVehicle(vehicleId) {
  return (dispatch) => {
    vehiclesApi.deleteVehicle(vehicleId)
      .then((response) => {
        dispatch(deleteVehicleSuccess(vehicleId, true))
        dispatch(push('/vehicles'))
      })
      .catch((error) => console.log(error));
  };
}

function deleteVehicleSuccess(vehicleId) {
  return {
    type: types.VEHICLE_DELETED,
    vehicleId
  };
}

export function updateVehicle(vehicle) {
  return {
    type: types.VEHICLE_UPDATED,
    vehicle
  };
}

export function addNewVehicle(vehicle) {
  var vehicleById = { [vehicle.id]: vehicle }
  return {
    type: types.VEHICLE_CREATED,
    vehicleById
  }
}
