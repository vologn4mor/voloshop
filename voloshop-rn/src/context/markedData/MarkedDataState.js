import { useReducer } from "react";
import { MarkedDataContext } from "./markedDataContext";
import { markedDataReducer } from "./markedDataReducer";
import {
  INC_COUNTER,
  REMOVE_MARK,
  SET_MARK,
  DEC_COUNTER,
  CLEAR_CART,
} from "../types";

export const MarkedDataState = ({ children }) => {
  const initialState = {
    markedData: [],
  };

  const [state, dispatch] = useReducer(markedDataReducer, initialState);

  const setMark = (id) => dispatch({ type: SET_MARK, id: id });

  const removeMark = (id) => dispatch({ type: REMOVE_MARK, id: id });

  const incCounter = (id) => dispatch({ type: INC_COUNTER, id: id });

  const decCounter = (id) => dispatch({ type: DEC_COUNTER, id: id });

  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <MarkedDataContext.Provider
      value={{
        markedData: state.markedData,
        setMark,
        removeMark,
        incCounter,
        decCounter,
        clearCart,
      }}
    >
      {children}
    </MarkedDataContext.Provider>
  );
};
