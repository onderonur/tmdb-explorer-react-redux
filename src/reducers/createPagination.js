import union from "lodash/union";
import createReducer from "./createReducer";

export const DEFAULT_FIRST_PAGE = 1;

const initialState = {
  nextPage: DEFAULT_FIRST_PAGE,
  pageCount: 0,
  totalCount: 0,
  ids: []
};

// Higher-order reducer: a function that returns a reducer.
// It creates (returns) a reducer managing pagination, given the action types to handle.
const createPagination = successType => {
  if (typeof successType !== "string") {
    throw new Error("Expected successType to be strings.");
  }

  return createReducer(initialState, {
    [successType]: (state, action) => {
      state.isFetching = false;

      const {
        response: {
          result: { results, total_pages, total_results }
        }
      } = action;

      state.ids = union(state.ids, results);
      state.pageCount = state.pageCount + 1;
      state.totalCount = total_results;
      state.nextPage =
        state.nextPage < total_pages
          ? state.nextPage + 1
          : // No next page if the previous "nextPage" is not less than "total_pages"
            null;
    }
  });
};

export default createPagination;

export const selectNextPage = (state = {}) => {
  return state.nextPage;
};

export const selectPageCount = (state = {}) => {
  return state.pageCount;
};

export const selectTotalCount = (state = {}) => {
  return state.totalCount;
};

export const selectPageItems = (state = {}) => {
  return state.ids;
};
