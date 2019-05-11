import { LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  username: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        username: ""
      };
    default:
      return state;
  }
};
