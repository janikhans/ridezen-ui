import _ from 'lodash';

import apiService from '../../services/api';
import * as types from './actionTypes'

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