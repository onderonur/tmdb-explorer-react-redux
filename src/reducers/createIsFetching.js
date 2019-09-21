import produce from "immer";

const initialState = false;

const createIsFetching = types => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected types to be an array of three elements.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected types to be strings.");
  }

  return (state = initialState, action) => {
    const [requestType, successType, failureType] = types;

    return produce(state, draft => {
      switch (action.type) {
        case requestType:
          return true;
        case successType:
          return false;
        case failureType:
          return false;
        default:
          return;
      }
    });
  };
};

export default createIsFetching;
