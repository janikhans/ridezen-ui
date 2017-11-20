import * as types from './actionTypes';
import _ from 'lodash';
import update from 'immutability-helper'

const initialState = {
  isSaving: false,
  hasErrored: false,
  isLoading: false,
  serviceItemsById: [],
  errors: null
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
    case types.CREATE_SERVICE_ITEM_HAS_ERRORED:
      return {
        ...state, 
        errors: action.errors
      };
    case types.SERVICE_ITEM_IS_SAVING:
      return {
        ...state, 
        isSaving: action.isSaving
      };
    case types.CREATED_SERVICE_ITEM:
      console.log(state.serviceItemsById)
      var serviceItems = state.serviceItemsById
      serviceItems[action.serviceItemById.id] = action.serviceItemById
      return {
        ...state, 
        serviceItemsById: serviceItems
      };
    default:
      return state;
  }
}

// Selectors
export function getServiceItemsIdArray(state) {
  return _.keys(state.serviceItems.serviceItemsById);
}