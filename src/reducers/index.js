import { combineReducers } from "redux";
import entities, * as fromEntities from "./entities";
import pagination, * as fromPagination from "./pagination";
import isFetching, * as fromIsFetching from "./isFetching";
import drawer, * as fromDrawer from "./drawer";
import bindSelectors from "./utils/bindSelectors";

const rootReducer = combineReducers({
  entities,
  pagination,
  isFetching,
  drawer
});

// Default export is the "reducer".
export default rootReducer;

// Selectors

// We will use these selectors in out components.
// So, we won't need to update every single of those selector calls if the state shape changes in the future.
// By this usage, the "state" parameter of selectors in the reducer files will be the state slice of the same reducer in that file.
// Because of we are using the same selector name in the reducer file, we can't use same name again.
// Thus, we used "namespace import syntax" (i.e. "* as fromEntities").

export const selectors = {
  ...bindSelectors(state => state.entities, fromEntities.selectors),
  ...bindSelectors(state => state.drawer, fromDrawer.selectors),
  ...bindSelectors(state => state.isFetching, fromIsFetching.selectors),
  ...bindSelectors(state => state.pagination, fromPagination.selectors)
};
