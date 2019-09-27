import createReducer from "./createReducer";

const initialState = false;

const createIsFetching = types => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected types to be an array of three elements.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected types to be strings.");
  }

  const [requestType, successType, failureType] = types;

  return createReducer(initialState, {
    [requestType]: () => true,
    [successType]: () => false,
    [failureType]: () => false
  });
};

export default createIsFetching;
