import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { query: "" };

const searchReducer = (
  state = initialState,
  action: PayloadAction<string | null>
) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        query: action.payload,
      };
    case "CLEAR_QUERY":
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
