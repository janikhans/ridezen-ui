import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  serviceNotificationsById: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SERVICE_NOTIFICATIONS_FETCHED:
      var serviceNotifications = Object.assign({}, state.serviceNotificationsById, action.serviceNotificationsById)
      return {
        ...state,
        serviceNotificationsById: serviceNotifications
      };
    case types.SERVICE_NOTIFICATIONS_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case types.SERVICE_NOTIFICATIONS_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

export function getServiceNotificationsIdArray(state, rideId) {
  var serviceNotifications = getServiceNotificationsForRide(state, rideId)
  return _.keys(_.pickBy(serviceNotifications, _.identity));
}

export function getServiceNotificationsById(state, rideId) {
  return getServiceNotificationsForRide(state, rideId)
}

export function getServiceNotificationsForRide(state, rideId) {
  return _.mapValues(state.serviceNotifications.serviceNotificationsById, function (interval) {
    if (interval.ride_id === rideId){
      return interval
    }
  });
}
