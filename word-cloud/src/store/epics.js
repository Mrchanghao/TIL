import axios from 'axios';
import { Observable } from 'rxjs'
import 'rxjs/add/observable/fromPromise';
import {ofType, take, filter, toArray, map, } from 'rxjs';

import { LOAD_APP_REVIEWS, LOAD_APP_REVIEWS_SUCCESS } from './../actions';

function fetchReviewPage(appId, page) {
  console.log(Observable.fromPromise(axios.get(`https://itunes.apple.com/us/rss/customerreviews/id=${appId}/mostrecent/json`)))
  return Observable.fromPromise(axios.get(`https://itunes.apple.com/us/rss/customerreviews/id=${appId}/mostrecent/json`))
}

function reviewsForAppId$(appId) {
  return Observable.range(1, 10)
    .flatMap(y => fetchReviewPage(appId, y))
};


const reviewEpic = (action$, store) => action$.ofType(LOAD_APP_REVIEWS)
  .flatMap(x => reviewsForAppId$(x.appId))
  .flatMap(x => x.data.feed.entry)
  .filter(x => x.content)
  .bufferCount(100)
  .map(x => ({type: LOAD_APP_REVIEWS_SUCCESS, reviews: x }));


export const rootEpic = reviewEpic;