import { produce } from "immer";

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // Using immer to allow state mutations to simplify reducers
      return produce(state, draft => handlers[action.type](draft, action));
    } else {
      return state;
    }
  };
}

export default createReducer;
