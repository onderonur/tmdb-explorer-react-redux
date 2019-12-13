import { getFetchTypes } from "utils";
import { createReducer } from "@reduxjs/toolkit";

const initialState = false;

const createIsFetching = baseType => {
  if (!typeof type === "string") {
    throw new Error("Expected types to be strings.");
  }

  const fetchTypes = getFetchTypes(baseType);

  return createReducer(initialState, {
    [fetchTypes.requestType]: () => true,
    [fetchTypes.successType]: () => false,
    [fetchTypes.errorType]: () => false,
    [fetchTypes.cancelType]: () => false
  });
};

export default createIsFetching;
