import { normalize } from "normalizr";

// Checking cached data to see if it exists and has all the required fields
function verifyCachedData(cachedData, requiredFields = []) {
  if (!cachedData) {
    return false;
  }

  return requiredFields.every(key => cachedData.hasOwnProperty(key));
}

// Inspiration from: https://redux.js.org/recipes/reducing-boilerplate
const callAPIMiddleware = store => next => action => {
  const { dispatch, getState } = store;

  const {
    types,
    callAPI,
    isFetching = () => false,
    selectCachedData = () => undefined,
    requiredFields = [],
    // "payload" is added to send extra data to reducers.
    // It is useful with reducers like "isFetching".
    payload = {},
    // Added this callback to change API response data that will be normalized.
    // But it may be used for other use cases too.
    processResponse,
    schema
  } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === "string")
  ) {
    throw new Error("Expected an array of three string types.");
  }

  if (typeof callAPI !== "function") {
    throw new Error("Expected callAPI to be a function.");
  }

  if (!Array.isArray(requiredFields)) {
    throw new Error("Expected requiredFields to be an array.");
  }

  if (processResponse && typeof processResponse !== "function") {
    throw new Error("Expected processResponse to be a function.");
  }

  const currentState = getState();

  if (isFetching(currentState)) {
    return;
  }

  const cachedData = selectCachedData(currentState);
  if (verifyCachedData(cachedData, requiredFields)) {
    return;
  }

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType, ...payload });

  return callAPI()
    .then(response => {
      let responseData = response.data;

      if (processResponse) {
        responseData = processResponse(responseData);
      }

      if (schema) {
        responseData = normalize(responseData, schema);
      }

      dispatch({ type: successType, response: responseData, ...payload });
    })
    .catch(error => {
      if (process.env.NODE_ENV === "development") {
        console.error("callAPIMiddleware: ", error);
      }
      dispatch({ type: failureType, error, ...payload });
    });
};

export default callAPIMiddleware;
