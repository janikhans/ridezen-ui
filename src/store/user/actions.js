import userApi from '../../services/user';
import * as types from './actionTypes'
import { push } from 'react-router-redux';

export function loginUser(credentials) {
  return dispatch => {
    dispatch(loginRequestIsSubmitting())
    userApi.loginUser(credentials)
    .then(response => {
      localStorage.setItem('expiry', response.headers.expiry)
      localStorage.setItem('access-token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('uid', response.headers.uid)
      localStorage.setItem('token-type', response.headers['token-type'])
      dispatch(loginSuccessful(response.data.data))
      dispatch(push('/'))
    })
    .catch(error => {
      dispatch(loginError(error.response.data.errors))
    });
  }
}

function loginRequestIsSubmitting() {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function loginSuccessful(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError(messages) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    messages
  }
}

export function signUpUser(credentials) {
  return dispatch => {
    dispatch(signUpRequestIsSubmitting())
    userApi.signUpUser(credentials)
    .then(response => {
      localStorage.setItem('expiry', response.headers.expiry)
      localStorage.setItem('access-token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('uid', response.headers.uid)
      localStorage.setItem('token-type', response.headers['token-type'])
      dispatch(signUpSuccessful(response.data.data))
      dispatch(push('/'))
    })
    .catch(error => {
      dispatch(signUpError(error.response.data.errors))
    });
  }
}

function signUpRequestIsSubmitting() {
  return {
    type: types.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function signUpSuccessful(user) {
  return {
    type: types.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function signUpError(errors) {
  return {
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errors
  }
}

export function logoutUser() {
  return dispatch => {
    userApi.logoutUser()
    .then(response => {
      localStorage.removeItem('expiry')
      localStorage.removeItem('access-token')
      localStorage.removeItem('client')
      localStorage.removeItem('uid')
      localStorage.removeItem('token-type')
      dispatch(logoutSuccessful())
      dispatch(push('/'))
    })
    .catch(error => {
      console.log(error)
    });
  }
}

function logoutSuccessful() {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: false
  }
}

export function verifyToken() {
  return dispatch => {
    dispatch(verifyingToken())
    userApi.verifyToken()
    .then(response => {
      dispatch(verifyTokenSuccess(response.data.data))
      dispatch(push('/'))
    })
    .catch(error => {
      dispatch(verifyTokenError())
    });
  }
}

function verifyingToken() {
  return {
    type: types.VERIFYING_TOKEN,
    isVerifying: true
  }
}

function verifyTokenSuccess(user) {
  return {
    type: types.VERIFY_TOKEN_SUCCESS,
    isVerifying: false,
    isAuthenticated: true,
    user
  }
}

function verifyTokenError() {
  return {
    type: types.VERIFY_TOKEN_ERROR,
    isVerifying: false
  }
}
