import * as types from './actionTypes';

const initialState = {
  isVerifying: false,
  isFetching: false,
  isAuthenticated: false,
  user: null
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
        user: action.user
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
        user: action.user
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        messages: action.messages
      };
    case types.VERIFYING_TOKEN:
      return {
        ...state,
        isVerifying: action.isVerifying
      };
    case types.VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        isVerifying: action.isVerifying,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    case types.VERIFY_TOKEN_ERROR:
      return {
        ...initialState,
        isVerifying: action.isVerifying
      };
    case types.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

// Selectors
export function isUserLoggedIn(state) {
  return state.user.isAuthenticated;
}

export function getMessages(state) {
  return state.user.messages
}

export function getErrors(state) {
  return state.user.errors
}

export function getUser(state) {
  return state.user.user
}

export function isVerifying(state) {
  return state.user.isVerifying
}
