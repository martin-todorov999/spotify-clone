import { PayloadAction } from "@reduxjs/toolkit";

interface ISessionState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  accessTokenTimestamp: number | null;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
  rehydrated: boolean;
}

const initialState: ISessionState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  accessTokenTimestamp: null,
  user: null,
  rehydrated: false,
};

const sessionReducer = (
  state = initialState,
  action: PayloadAction<ISessionState>
) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn,
        accessTokenTimestamp: action.payload.accessTokenTimestamp,
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        accessTokenTimestamp: action.payload.accessTokenTimestamp,
      };
    case "LOG_OUT":
      return initialState;
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "REHYDRATION_COMPLETE":
      return {
        ...state,
        rehydrated: true,
      };
    default:
      return state;
  }
};

export default sessionReducer;
