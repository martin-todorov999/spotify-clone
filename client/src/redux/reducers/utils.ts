import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { primaryColor: null };

const utilsReducer = (
  state = initialState,
  action: PayloadAction<string | null>
) => {
  switch (action.type) {
    case "SET_PRIMARY_COLOR":
      return {
        primaryColor: action.payload,
      };
    case "CLEAR_PRIMARY_COLOR":
      return initialState;
    default:
      return state;
  }
};

export default utilsReducer;
