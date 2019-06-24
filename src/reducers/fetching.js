import produce from "immer";

function fetching({ types, mapActionToKey }) {
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

  function updateIsFetching(state = false, action) {
    return produce(state, draft => {
      switch (action.type) {
        case requestType:
          return true;
        case successType:
          return false;
        case failureType:
          return false;
        default:
          return state;
      }
    });
  }

  // I explained why we are initializing state according to "mapActionToKey" at "reducers/paginate.js"
  return (state = mapActionToKey ? {} : false, action) => {
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

            draft[key] = updateIsFetching(draft[key], action);
          } else {
            return updateIsFetching(draft, action);
          }
          break;
        default:
          return;
      }
    });
  };
}

export default fetching;
