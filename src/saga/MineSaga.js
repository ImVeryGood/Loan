import { all, fork, put, call, take, takeEvery } from "redux-saga/effects";
import * as Api from "../net/Api";
import { Info, Info_saga } from "../redux/action/MineAction";
function* setInfo() {
  while (true) {
    const action = yield take(Info_saga);
    yield put({ type: Info, name: action.info });
  }
}
export default function* root(): any {
  yield all([yield fork(setInfo)]);
}
