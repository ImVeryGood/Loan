import { combineReducers } from "redux";
import HomeReducer from "./HomeReducer";
import MineReducer from "./MineReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
const persistedConfig = {
  key: "root",
  storage
};
const appReducer = combineReducers({
  HomeReducer,
  MineReducer
});
const persistedReducer = persistReducer(persistedConfig, appReducer);
export default persistedReducer;
