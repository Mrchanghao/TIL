import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {reviewRedcuer} from './reducers';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
// import { rootEpic } from './epics';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ reviewRedcuer })

// middleware 적용
// const epicMiddleware = createEpicMiddleware();
// epicMiddleware.run(rootEpic);
const sagaMiddleware = createSagaMiddleware();


// const sagaMiddleware = createSagaMiddleware(rootSaga)


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;

// export const configureStore = (initialState = {}) => {
//   // const store = createStore(rootReducer, initialState, applyMiddleware());
//   const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
//   return store;
// }