import { produce } from "immer";

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    const { type } = action;
    if (handlers.hasOwnProperty(type)) {
      // Using immer to allow state mutations to simplify reducers
      const caseReducer = handlers[type];
      return produce(state, draft => caseReducer(draft, action));
    } else {
      return state;
    }
  };
}

export default createReducer;
