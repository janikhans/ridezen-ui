import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  hasErrored: false,
  isLoading: false,
  serviceItemsById: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SERVICE_ITEMS_FETCHED:
      return {
        ...state, 
        serviceItemsById: action.serviceItemsById
      };
    case types.SERVICE_ITEMS_HAS_ERRORED:
      return {
        ...state, 
        hasErrored: action.hasErrored
      };
    case types.SERVICE_ITEMS_IS_LOADING:
      return {
        ...state, 
        isLoading: action.isLoading
      };
    default:
      return state;
  }
}

// Selectors
export function getServiceItemsIdArray(state) {
  return _.keys(state.serviceItems.serviceItemsById);
}