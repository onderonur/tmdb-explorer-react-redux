import union from "lodash/union";
import { getFetchTypes } from "utils";
import { createReducer } from "@reduxjs/toolkit";

export const DEFAULT_FIRST_PAGE = 1;

const initialState = {
  nextPage: DEFAULT_FIRST_PAGE,
  pageCount: 0,
  totalCount: 0,
  ids: []
};

const storePage = (state, action) => {
  const { response } = action.payload;
  const { result } = response;
  const { results, total_pages, total_results } = result;

  state.ids = union(state.ids, results);
  state.pageCount = state.pageCount + 1;
  state.totalCount = total_results;
  state.nextPage =
    state.nextPage < total_pages
      ? state.nextPage + 1
      : // No next page if the previous "nextPage" is not less than "total_pages"
        null;
};

// Higher-order reducer: a function that returns a reducer.
// It creates (returns) a reducer managing pagination, given the action type(s) to handle.
const createPagination = pattern => {
  let successTypes = [];

  const storeSuccessType = type => {
    const { successType } = getFetchTypes(type.toString());
    successTypes.push(successType);
  };

  if (Array.isArray(pattern)) {
    for (const type of pattern) {
      storeSuccessType(type);
    }
  } else {
    storeSuccessType(pattern);
  }

  const actionsMap = {};
  for (const successType of successTypes) {
    actionsMap[successType] = storePage;
  }

  const reducer = createReducer(initialState, actionsMap);
  return reducer;
};

export default createPagination;

export const selectors = {
  selectNextPage: (state = {}) => state.nextPage,
  selectPageCount: (state = {}) => state.pageCount,
  selectTotalCount: (state = {}) => state.totalCount,
  selectPageItems: (state = {}) => state.ids
};
