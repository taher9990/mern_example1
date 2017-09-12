import * as types from './actionTypes'
import auth from '../services/auth';
import queryString from 'query-string';

import {
  notification,
  message
} from 'antd';

export const authRequest = () => ({
  type: types.AUTH_REQUEST,
});
export const authRequestError = error => ({
  type: types.AUTH_REQUEST_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const signinSuccess = () => ({
  type: types.SIGN_IN_SUCCESS,
});
export const signupSuccess = () => ({
  type: types.SIGN_UP_SUCCESS,
});
export const signoutSuccess = () => ({
  type: types.SIGN_OUT_SUCCESS,
})

export const signin = (user, history) => {
  return dispatch => {
    dispatch(authRequest());
    auth.signin(user).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          notification.error({
            message: error.message
          });
        });
      }
      response.json().then(user => {
        dispatch(signinSuccess(user, history));
        notification.success({
          message: 'Sign In successfully'
        });
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      // dispatch(authRequestError(errorMsg))
      notification.error({
        message: errorMsg
      });
    });
  }
};

export const signup = (user, history) => {
  return dispatch => {
    dispatch(authRequest());

    auth.signup(user).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          notification.error({
            message: error.message
          });
        });
      }
      response.json().then(user => {
        dispatch(signupSuccess(user, history));
        notification.success({
          message: 'Sign Up successfully'
        });
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      // dispatch(authRequestError(errorMsg))
      notification.error({
        message: errorMsg
      });
    });
  }
};