import { getFetchTypes } from "utils";
import { createReducer } from "@reduxjs/toolkit";

const initialState = false;

const createIsFetching = fetchType => {
  if (!typeof type === "string") {
    throw new Error("Expected types to be strings.");
  }

  const { requestType, successType, errorType, cancelType } = getFetchTypes(
    fetchType
  );

  return createReducer(initialState, {
    [requestType]: () => true,
    [successType]: () => false,
    [errorType]: () => false,
    [cancelType]: () => false
  });
};

export default createIsFetching;
