import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import rootSaga from "../../saga/CombineSaga";
import { persistStore } from "redux-persist";
import reducers from "../reducer/CombineReducer";
import storage from "redux-persist/es/storage";

const config = {
  key: "root",
  storage
};
const sagaMiddleware = createSagaMiddleware();
//设置多个中间件
const middleWares = [sagaMiddleware];
const enhances = [applyMiddleware(...middleWares)];
const store = createStore(reducers, compose(...enhances));
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
module.exports = {
  store,
  persistor
};
