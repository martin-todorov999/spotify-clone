import { PayloadAction } from "@reduxjs/toolkit";

const initialState = { uri: null, albumUri: null };

const playbackReducer = (
  state = initialState,
  action: PayloadAction<string[] | null>
) => {
  switch (action.type) {
    case "SET_URI":
      return {
        uri: action.payload,
      };
    case "SET_ALBUM_URI":
      return {
        ...state,
        albumUri: action.payload,
      };
    case "CLEAR_URI":
      return initialState;
    default:
      return state;
  }
};

export default playbackReducer;
