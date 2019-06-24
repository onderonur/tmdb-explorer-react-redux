import { normalize } from "normalizr";

// https://redux.js.org/recipes/reducing-boilerplate
const callAPIMiddleware = ({ dispatch, getState }) => next => action => {
  const {
    types,
    callAPI,
    shouldCallAPI = () => true,
    payload = {},
    // Added this callback to add or change API response data that will be normalized.
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

  if (!shouldCallAPI(getState())) {
    return;
  }

  if (processResponse && typeof processResponse !== "function") {
    throw new Error("Expected processResponse to be a function.");
  }

  const [requestType, successType, failureType] = types;

  dispatch({ ...payload, type: requestType });

  return callAPI()
    .then(response => {
      let responseData = response.data;

      if (processResponse) {
        responseData = processResponse(responseData);
      }

      if (schema) {
        // TODO: Bu payload olayına bi bak real-world example'dan vs de
        const normalizedData = normalize(responseData, schema);
        dispatch({ ...payload, response: normalizedData, type: successType });
      } else {
        dispatch({ ...payload, response: response.data, type: successType });
      }
    })
    .catch(error => dispatch({ ...payload, error, type: failureType }));
};

export default callAPIMiddleware;
