import { PayloadAction } from "@reduxjs/toolkit";

const loggedReducer = (state = false, action: PayloadAction) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;
    case "SIGN_OUT":
      return false;
    default:
      return state;
  }
};

export default loggedReducer;
