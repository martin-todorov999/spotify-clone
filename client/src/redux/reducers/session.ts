import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { sessionToken: null };

const sessionReducer = (
  state = initialState,
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        accessToken: action.payload,
      };
    // case "LOG_OUT":
    //   return {
    //     accessToken: null,
    //   };
    default:
      return state;
  }
};

export default sessionReducer;
