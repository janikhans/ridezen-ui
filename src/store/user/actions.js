import _ from 'lodash';

import userApi from '../../services/user';
import * as types from './actionTypes'
import { push } from 'react-router-redux';

export function loginUser(credentials) {
  return dispatch => {
    dispatch(loginRequestIsSubmitting())
    userApi.loginUser(credentials)
    .then(response => {
      localStorage.setItem('expiry', response.headers.expiry)
      localStorage.setItem('access_token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('u_id', response.headers.uid)
      dispatch(loginSuccessful(response.data))
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
    access_token: user.access_token,
    email: user.email,
    username: user.username
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
      localStorage.setItem('access_token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('u_id', response.headers.uid)
      dispatch(signUpSuccessful(response.data))
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
    access_token: user.access_token,
    email: user.email,
    username: user.username
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
