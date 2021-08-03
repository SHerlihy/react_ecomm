import { createStore } from "redux";
import { reducer } from "./store";

export const storeFactory = (initialState) => {
  return createStore(reducer, initialState);
};

export const findByTestAttr = (wrapper, val) => {
  const found = wrapper.find(`[data-test="${val}"]`);
  return found;
};
