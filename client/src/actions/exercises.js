import {
  FETCH_EXERCISES_START,
  FETCH_EXERCISES_SUCCESS,
  FETCH_EXERCISES_FAILURE
} from "./types";
import axios from "axios";

export const fetchExercises = ({ from = "", to = "", limit = "" }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: FETCH_EXERCISES_START
  });

  // Endpoint looks like /api/exercises/:from?/:to?/:limit?
  let query = "/api/exercises";

  if (from) {
    query = `${query}/from=${from}`;
  }

  if (to) {
    query = `${query}/to=${to}`;
  }

  if (limit) {
    query = `${query}/limit=${limit}`;
  }

  const filters = {
    from,
    to,
    limit
  };

  axios
    .get(query)
    .then(res => {
      if (res.status === 200) {
        const exercises = res.data;
        dispatch({
          type: FETCH_EXERCISES_SUCCESS,
          payload: {
            exercises,
            filters
          }
        });
      } else {
        dispatch({
          type: FETCH_EXERCISES_FAILURE,
          payload: {
            error: res.error,
            filters
          }
        });
      }
    })
    .catch(error => {
      dispatch({
        type: FETCH_EXERCISES_FAILURE,
        payload: {
          error,
          filters
        }
      });
    });
};
