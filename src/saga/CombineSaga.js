import { fork } from "redux-saga/effects";
import { all } from "redux-saga";
import HomeSaga from "./HomeSaga";
import MineSaga from "./MineSaga";

export default function* rootSaga() {
  yield fork(HomeSaga);
  yield fork(MineSaga);
}
