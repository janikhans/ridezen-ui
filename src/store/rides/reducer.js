import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  ridesById: []
}

export default function reduce(state = initialState, action = {}) {
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
    default:
      return state;
  }
}

// Selectors
export function getRidesIdArray(state) {
  return _.keys(state.rides.ridesById);
}