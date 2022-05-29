import { CLEAR_ERROR, FETCH_DATA, SET_ERROR } from "../types";

const handlers = {
  [FETCH_DATA]: (state, { result }) => ({
    ...state,
    dataState: result,
  }),
  [SET_ERROR]: (state) => ({
    ...state,
    error: true,
  }),
  [CLEAR_ERROR]: (state) => ({
    ...state,
    error: false,
  }),
  DEFAULT: (state) => state,
};

export const dataReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
