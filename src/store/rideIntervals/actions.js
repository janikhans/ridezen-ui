import _ from 'lodash';

import ridesApi from '../../services/member/rides';
import * as types from './actionTypes'

// Fetch Intervals for a given ride
export function fetchRideIntervals(rideId) {
  return (dispatch) => {
    dispatch(rideIntervalsIsLoading(true));
    ridesApi.getRideIntervals(rideId)
      .then((response) => {
        dispatch(rideIntervalsIsLoading(false));
        const intervalsById = _.keyBy(response.data, (interval) => interval.ride_id + '_' + interval.service_item_id);
        dispatch(fetchRideIntervalsSuccess(intervalsById))
      })
      .catch(() => dispatch(rideIntervalsHasErrored(true)));
  };
}

export function rideIntervalsHasErrored(bool) {
  return {
    type: types.RIDE_INTERVALS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function rideIntervalsIsLoading(bool) {
  return {
    type: types.RIDE_INTERVALS_IS_LOADING,
    isLoading: bool
  };
}
export function fetchRideIntervalsSuccess(intervalsById) {
  return {
    type: types.RIDE_INTERVALS_FETCHED,
    intervalsById
  };
}
