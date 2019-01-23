import { combineReducers } from "redux";
import HomeReducer from "./HomeReducer";
import MineReducer from "./MineReducer";
const appReducer = combineReducers({
  HomeReducer: HomeReducer,
  MineReducer: MineReducer
});
export default appReducer;
