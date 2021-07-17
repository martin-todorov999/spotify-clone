import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { accessToken: null };

const sessionReducer = (
  state = initialState,
  action: PayloadAction<string | null>
) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        accessToken: action.payload,
      };
    case "LOG_OUT":
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
