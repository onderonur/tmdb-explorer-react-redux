import produce from "immer";
import { TOGGLE_DRAWER } from "actions";

const initialState = {
  isOpen: false
};

export function drawer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case TOGGLE_DRAWER:
        draft.isOpen = !draft.isOpen;
        break;
      default:
        return;
    }
  });
}
