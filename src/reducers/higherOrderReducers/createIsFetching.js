import createReducer from "./createReducer";

const initialState = false;

const createIsFetching = type => {
  if (!typeof type === "string") {
    throw new Error("Expected types to be strings.");
  }

  const requestType = `${type}_REQUEST`;
  const successType = `${type}_SUCCESS`;
  const failureType = `${type}_ERROR`;

  return createReducer(initialState, {
    [requestType]: () => true,
    [successType]: () => false,
    [failureType]: () => false
  });
};

export default createIsFetching;
