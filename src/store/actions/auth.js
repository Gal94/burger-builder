import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  //remove the token and expiration time we stored upon logging in
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOG_OUT,
  };
};

//dispatches after the set amount of time of expirationTime(1 hour default)
export const checkAuthTimeout = (expirationTime) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    //...Authenticate User
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        process.env.REACT_APP_FIREBASE;

      //Switch to login url
      if (!isSignup) {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.REACT_APP_FIREBASE;
      }

      const response = await axios.post(url, authData);
      console.log(response.data);

      //current data + expiry times in seconds
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      //stores data on the browser local storage
      //gets a key as the first argument and a value as a second argument
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (e) {
      console.log(e.response);
      dispatch(authFail(e.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  console.log(path);
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        //(expirationDate.getTime() - new Date().getTime())/1000 = the ms difference between expiry time
        // and right now, will log user out after 1 hour
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
