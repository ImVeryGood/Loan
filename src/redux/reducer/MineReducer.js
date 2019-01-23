import { Info } from "../action/MineAction";
import { fromJS, Map } from "immutable";

const initState = Map({
  info: "你好"
});
const mineReducer = (state = initState, action) => {
  switch (action.type) {
    case Info:
      return state.set("info", action.name);
    default:
      return state;
  }
};
export default mineReducer;
