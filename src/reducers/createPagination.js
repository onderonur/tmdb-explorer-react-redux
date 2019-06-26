import union from "lodash/union";
import produce from "immer";

export const DEFAULT_FIRST_PAGE = 1;

// Higher-order reducer: a function that returns a reducer.
// It creates (returns) a reducer managing pagination, given the action types to handle.
const createPagination = successType => {
  if (typeof successType !== "string") {
    throw new Error("Expected successType to be strings.");
  }

  const initialState = {
    nextPage: DEFAULT_FIRST_PAGE,
    pageCount: 0,
    totalCount: 0,
    ids: []
  };

  return (state = initialState, action) => {
    return produce(state, draft => {
      switch (action.type) {
        case successType:
          draft.isFetching = false;

          const {
            response: {
              result: { results, total_pages, total_results }
            }
          } = action;

          draft.ids = union(draft.ids, results);
          draft.pageCount = draft.pageCount + 1;
          draft.totalCount = total_results;
          draft.nextPage =
            draft.nextPage < total_pages
              ? draft.nextPage + 1
              : // No next page if the previous "nextPage" is not less than "total_pages"
                null;
          break;
        default:
          return;
      }
    });
  };
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
