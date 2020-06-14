import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    //...Authenticate User
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          process.env.REACT_APP_FIREBASE,
        authData
      );
      console.log(response);
      dispatch(authSuccess(response.data));
    } catch (e) {
      console.log(e);
      dispatch(authFail(e));
    }
  };
};
