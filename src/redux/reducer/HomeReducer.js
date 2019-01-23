import {
  GetBannerList,
  GetMoneyList,
  SetDateChecked,
  SetMoneyChecked
} from "../action/HomeAction";
import { fromJS, Map } from "immutable";
export const totalState = Map({
  banner: Map({}),
  money: Map({}),
  day: Map({})
});
const homeReducer = (state = totalState, action) => {
  switch (action.type) {
    case GetBannerList:
      return state.set("banner", action.banner);
    case GetMoneyList:
      return state.set("money", action.money).set("day", action.day);
    case SetMoneyChecked:
      alert("reducer" + JSON.stringify(action.money_arr));
      return state.set("money", action.money_arr);
    case SetDateChecked:
      return state.set("day", action.day_arr);
    default:
      return state;
  }
};
export default homeReducer;
