export const RESET = 'RESET';
export const LOAD_APP_REVIEWS = 'LOAD_APP_REVIEWS';
export const LOAD_APP_REVIEWS_SUCCESS = 'LOAD_APP_REVIEWS_SUCCESS';
export const LOAD_APP_REVIEWS_FAILURE = 'LOAD_APP_REVIEWS_FAILURE'

// fetching start
export const getReviews = (appId) => {
  return {
    type: LOAD_APP_REVIEWS,
    appId,
  }
};

export const reset = () => {
  return {
    type: RESET
  }
};

