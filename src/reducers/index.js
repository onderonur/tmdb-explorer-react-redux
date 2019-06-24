import { combineReducers } from "redux";
import { entities } from "./entities";
import { pagination } from "./pagination";
import { isFetching } from "./isFetching";

const rootReducer = combineReducers({
  entities,
  pagination,
  isFetching
});

export default rootReducer;
