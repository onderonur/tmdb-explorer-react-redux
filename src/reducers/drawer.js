import * as actionTypes from "constants/actionTypes";
import createReducer from "./higherOrderReducers/createReducer";

const initialState = {
  isOpen: false
};

const drawer = createReducer(initialState, {
  [actionTypes.TOGGLE_DRAWER]: (state, action) => {
    state.isOpen = !state.isOpen;
  }
});

export default drawer;

export function selectIsDrawerOpen(state) {
  return state.isOpen;
}
