import { all, fork, put, call, take, takeEvery } from "redux-saga/effects";
import * as Api from "../net/Api";
import {
  GetBannerList,
  GetBannerList_saga,
  GetMoneyList,
  GetMoneyList_saga
} from "../redux/action/HomeAction";
import fetchSmart from "../fetch";

const money_list = [];
const day_list = [];
function* getBanner() {
  yield take(GetBannerList_saga);
  try {
    const res = yield call(fetchSmart, Api.bannerUrl, {
      method: "GET"
    });
    yield put({ type: GetBannerList, banner: res.result });
  } catch (error) {
    alert(error);
  }
}
function* getMoney() {
  yield take(GetMoneyList_saga);
  try {
    const res = yield call(fetchSmart, Api.money_url, {
      method: "GET"
    });
    yield put({
      type: GetMoneyList,
      money: res.result.loanAmountValues,
      day: res.result.showPeriod
    });
  } catch (e) {
    alert(e);
  }
}

export default function* root(): any {
  yield all([fork(getMoney), fork(getBanner)]);
}
