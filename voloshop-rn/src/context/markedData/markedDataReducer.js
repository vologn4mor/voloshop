import {
  SET_MARK,
  REMOVE_MARK,
  INC_COUNTER,
  DEC_COUNTER,
  CLEAR_CART,
} from "../types";

export const markedDataReducer = (state, action) => {
  switch (action.type) {
    case SET_MARK:
      return {
        ...state,
        markedData: [...state.markedData, { id: action.id, counter: 1 }],
      };
    case REMOVE_MARK:
      return {
        ...state,
        markedData: state.markedData.filter(
          (marked) => marked.id !== action.id
        ),
      };
    case INC_COUNTER:
      return {
        ...state,
        markedData: state.markedData.map((item) => {
          if (item.id === action.id) {
            item.counter = item.counter + 1;
          }
          return item;
        }),
      };
    case DEC_COUNTER:
      return {
        ...state,
        markedData: state.markedData.map((item) => {
          if (item.id === action.id) {
            item.counter = item.counter - 1;
          }
          return item;
        }),
      };
    case CLEAR_CART:
      return {
        ...state,
        markedData: [],
      };
    default:
      return state;
  }
};
