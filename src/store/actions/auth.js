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
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    } catch (e) {
      console.log(e.response);
      dispatch(authFail(e.response.data.error));
    }
  };
};
