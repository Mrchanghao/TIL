import { RESET, LOAD_APP_REVIEWS, LOAD_APP_REVIEWS_SUCCESS, LOAD_APP_REVIEWS_FAILURE } from './../actions'

const initialState = {
  reviews: [],
  loading: false
};


export const reviewRedcuer = (state = initialState, action) => {
  switch(action.type) {
    case RESET:
      return {
        ...state,
        reviews: [],
      };
    case LOAD_APP_REVIEWS:
      return {
        ...state,
        // reviews: [],
        loading: true,
      };
    case LOAD_APP_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.newReviews,
      }
    case LOAD_APP_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: '에러'
      }
    default:
      return state;
  }
}
