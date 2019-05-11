import {
  FETCH_EXERCISES_START,
  FETCH_EXERCISES_SUCCESS,
  FETCH_EXERCISES_FAILURE
} from "../actions/types";

const initialState = {
  exercises: [],
  isLoading: false,
  filters: {
    from: "",
    to: "",
    limit: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXERCISES_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_EXERCISES_SUCCESS:
      return {
        ...state,
        exercises: action.payload.exercises,
        filters: { ...state.filters, ...action.payload.filters },
        isLoading: false
      };
    case FETCH_EXERCISES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        filters: { ...state.filters, ...action.payload.filters }
      };
    default:
      return state;
  }
};
