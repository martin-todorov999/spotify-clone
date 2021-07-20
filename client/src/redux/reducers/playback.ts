import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { trackUri: "" };

const playbackReducer = (
  state = initialState,
  action: PayloadAction<string | null>
) => {
  switch (action.type) {
    case "SET_TRACK_URI":
      return {
        trackUri: action.payload,
      };
    case "CLEAR_TRACK_URI":
      return initialState;
    default:
      return state;
  }
};

export default playbackReducer;
