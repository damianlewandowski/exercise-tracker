import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import exercises from "./exercises";

export default combineReducers({
  user,
  exercises,
  form: formReducer
});
