import * as types from './actionTypes';
import _ from 'lodash';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  email: ''
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        access_token: action.access_token,
        email: action.email,
        username: action.username
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        access_token: action.access_token,
        email: action.email,
        username: action.username
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        messages: action.messages
      };
    default:
      return state;
  }
}

// Selectors
export function isUserLoggedIn(state) {
  return state.user.isAuthenticated;
}

export function userName(state) {
  return state.user.username;
}

export function getMessages(state) {
  return state.user.messages
}

export function getErrors(state) {
  return state.user.errors
}
