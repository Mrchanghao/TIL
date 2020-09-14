import { call, put, takeLatest, all, takeEvery, fork, take } from 'redux-saga/effects';
import { LOAD_APP_REVIEWS, LOAD_APP_REVIEWS_SUCCESS, LOAD_APP_REVIEWS_FAILURE } from './../actions';
import axios from 'axios';
// import { take } from 'rxjs-compat/operator/take';
// https://itunes.apple.com/us/rss/customerreviews/id=${appId}/mostrecent/json

function getReviewsAPI(appId) {
  return axios.get(`https://itunes.apple.com/us/rss/customerreviews/id=${appId}/mostrecent/json`)
  // return axios.get(`https://jsonplaceholder.typicode.com/todos/${appId}`)
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .catch(err => console.log(err));
}

function* fetchReviewsSaga(action) {
  const { appId } = action;
  // const action = yield take(LOAD_APP_REVIEWS);
  // const {data, error} = yield call(getReviewsAPI, appId);
  // let url = `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/mostrecent/json`
  try {
    
      // const res = yield call(getReviewsAPI, );
      const { feed } = yield call(getReviewsAPI, appId);
      let newReviews = feed.entry;
      yield put({type: LOAD_APP_REVIEWS_SUCCESS, newReviews,})
    
    // } else {
    //   const reviews = call(getReviewsAPI, appId = 284882215);
    //   yield put({type: LOAD_APP_REVIEWS_SUCCESS, reviews,})
    // }

  } catch (error) {
    yield put({ type: LOAD_APP_REVIEWS_FAILURE, error: error.message})
  }

}


function* forkFetchReviewSaga() {
  while(true) {
    const {appId} = yield take(LOAD_APP_REVIEWS);
    try {
      const { feed } = yield call(getReviewsAPI, appId);
      let newReviews = feed.entry;
      yield put({type: LOAD_APP_REVIEWS_SUCCESS, newReviews,});
    } catch (error) {
      yield put({type: LOAD_APP_REVIEWS_FAILURE, error: error.message});
    }
  }
}


export default function* rootSaga() {
  // yield fork(forkFetchReviewSaga)
  yield takeLatest(LOAD_APP_REVIEWS, fetchReviewsSaga);
};

