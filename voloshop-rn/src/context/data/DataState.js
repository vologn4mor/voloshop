import { useReducer } from "react";
import { DataContext } from "./dataContext";
import { dataReducer } from "./dataReducer";
import { fakeData } from "../../fakeData";
import { Consts } from "../../consts";
import { FETCH_DATA } from "../types";
import { SET_ERROR } from "../types";
import { CLEAR_ERROR } from "../types";

export const DataState = ({ children }) => {
  const initialState = {
    dataState: null,
    error: false,
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchData = async () => {
    dispatch({ type: CLEAR_ERROR });
    try {
      const response = await fetch(Consts.Backend_URL + "/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const result = data.map((item) => ({
        id: item._id,
        category: item.category,
        cost: item.cost,
        name: item.name,
        description: item.description,
        picture: Consts.Backend_URL + "/" + item.picture,
      }));
      setTimeout(() => {
        dispatch({ type: FETCH_DATA, result });
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: SET_ERROR });
      }, 2000);
    }
  };

  return (
    <DataContext.Provider
      value={{ dataState: state.dataState, fetchData, error: state.error }}
    >
      {children}
    </DataContext.Provider>
  );
};
