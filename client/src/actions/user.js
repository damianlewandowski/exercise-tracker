import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const loginUser = username => dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: username
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
