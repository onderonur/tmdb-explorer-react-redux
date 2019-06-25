import produce from "immer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  isOpen: false
};

function drawer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.TOGGLE_DRAWER:
        draft.isOpen = !draft.isOpen;
        break;
      default:
        return;
    }
  });
}

export default drawer;
