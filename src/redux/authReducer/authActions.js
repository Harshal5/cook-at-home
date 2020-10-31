import jwtDecode from 'jwt-decode';
import { API, setHeaderToken } from '../../services/api';
import { AUTH_REQUEST, AUTH_SUCCESS, LOGOUT, AUTH_FAILURE } from './actionTypes';

export const authRequest = () => {
  return {
    type: AUTH_REQUEST
  };
};

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user
  };
};

export const authFailure = (error) => {
  return {
    type: AUTH_FAILURE,
    error
  };
};

export const logout = () => {
  localStorage.clear();
  setHeaderToken(false);
  return {
    type: LOGOUT
  };
};

export const localLogin = async (store) => {
  try {
    if (localStorage.accessToken) {
      store.dispatch(authRequest());
      let decoded = jwtDecode(localStorage.refreshToken);
      if (!decoded || Date.now() >= decoded.exp * 1000)
        throw new Error('You have been logged out');
      setHeaderToken(localStorage.accessToken);
      store.dispatch(authSuccess(JSON.parse(localStorage.user)));
    }
  } catch (err) {
    logout();
  }
};

export const login = (userType, data) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const { remember, ...userData } = data;
    const res = await API.post('/auth/login', userData);
    const { accessToken, refreshToken, ...user } = res.data;
    if (remember) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    setHeaderToken(accessToken);
    console.log(user);
    dispatch(authSuccess(user));
  } catch (err) {
    if (err.response) dispatch(authFailure(err.response.data.error));
    else dispatch(authFailure(err));
    throw err;
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authRequest());
    const res = await API.post('/auth/register', {
      ...userData
    });
    const { accessToken, refreshToken, ...user } = res.data;
    console.log(res.data);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setHeaderToken(accessToken);
    dispatch(authSuccess(user));
  } catch (err) {
    console.log(err);
    if (err.response) dispatch(authFailure(err.response.data.error));
    else dispatch(authFailure(err));
    throw err;
  }
};
