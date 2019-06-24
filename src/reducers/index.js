import { combineReducers } from "redux";
import { entities } from "./entities";
import { pagination } from "./pagination";
import { isFetching } from "./isFetching";
import { drawer } from "./drawer";

const rootReducer = combineReducers({
  entities,
  pagination,
  isFetching,
  drawer
});

export default rootReducer;
