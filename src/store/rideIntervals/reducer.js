import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  intervalsById: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.RIDE_INTERVALS_FETCHED:
      var intervals = Object.assign({}, state.intervalsById, action.intervalsById)
      return {
        ...state,
        intervalsById: intervals
      };
    case types.RIDE_INTERVALS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.RIDE_INTERVALS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export function getRideIntervalsIdArray(state, rideId) {
  var intervals = getRideIntervalsForRide(state, rideId)
  return _.keys(_.pickBy(intervals, _.identity));
}

export function getRideIntervalsById(state, rideId) {
  return getRideIntervalsForRide(state, rideId)
}

export function getRideIntervalsForRide(state, rideId) {
  return _.mapValues(state.rideIntervals.intervalsById, function (interval) {
    if (interval.ride_id === rideId){
      return interval
    }
  });
}
