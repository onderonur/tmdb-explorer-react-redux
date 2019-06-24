import union from "lodash/union";
import produce from "immer";

export const DEFAULT_FIRST_PAGE = 1;

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected types to be an array of three elements.");
  }
  if (!types.every(t => typeof t === "string")) {
    throw new Error("Expected types to be strings.");
  }
  if (mapActionToKey && typeof mapActionToKey !== "function") {
    throw new Error("Expected mapActionToKey to be a function.");
  }

  const [requestType, successType, failureType] = types;

  const initialPaginationItemState = {
    isFetching: false,
    nextPage: DEFAULT_FIRST_PAGE,
    pageCount: 0,
    totalCount: 0,
    ids: []
  };

  function updatePagination(state = initialPaginationItemState, action) {
    return produce(state, draft => {
      switch (action.type) {
        case requestType:
          draft.isFetching = true;
          break;
        case successType:
          draft.isFetching = false;

          const {
            response: {
              result: { results, total_pages, total_results }
            }
          } = action;

          draft.ids = union(draft.ids, results);
          draft.nextPage =
            draft.nextPage < total_pages
              ? draft.nextPage + 1
              : // No next page if the previous "nextPage" is not less than "total_pages"
                null;

          draft.pageCount = draft.pageCount + 1;
          draft.totalCount = total_results;
          break;
        case failureType:
          draft.isFetching = false;
          break;
        default:
          return;
      }
    });
  }

  // We are either mapping paginations by some key (when we have the "mapActionToKey").
  // Like "searchResultsByQuery".
  // Or we don't do any mapping and create pagination at the rool levet.
  // Like "popularMovies".
  // When we are mapping, we want the initial state of the root level as "{ }".
  // Becaus we want to add items (I called these "paginationItems") under this object by some key.
  // But when we don't have any mapping, we want this item structure at the root level.
  // So, we are using the below initialization.
  // `state = mapActionToKey ? {} : initialPaginationItemState`
  return (state = mapActionToKey ? {} : initialPaginationItemState, action) => {
    // Update pagination by key
    return produce(state, draft => {
      switch (action.type) {
        case requestType:
        case successType:
        case failureType:
          if (mapActionToKey) {
            const key = mapActionToKey(action);
            if (typeof key !== "string") {
              throw new Error("Expected key to be a string");
            }

            draft[key] = updatePagination(draft[key], action);
          } else {
            return updatePagination(state, action);
          }

          break;
        default:
          return;
      }
    });
  };
}
