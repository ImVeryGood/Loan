import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import appReducer from "../reducer/CombineReducer";
import rootSaga from "../../saga/CombineSaga";
import homeSaga from "../../saga/HomeSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
