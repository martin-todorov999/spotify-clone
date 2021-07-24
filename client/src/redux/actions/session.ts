export const logIn = (
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  accessTokenTimestamp: number
) => {
  return {
    type: "LOG_IN",
    payload: {
      accessToken,
      refreshToken,
      expiresIn,
      accessTokenTimestamp,
    },
  };
};

export const refreshAccessToken = (
  accessToken: string,
  expiresIn: number,
  accessTokenTimestamp: number
) => {
  return {
    type: "REFRESH_TOKEN",
    payload: {
      accessToken,
      expiresIn,
      accessTokenTimestamp,
    },
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export const setUser = (user: SpotifyApi.CurrentUsersProfileResponse) => {
  return {
    type: "SET_USER",
    payload: {
      user,
    },
  };
};

export const rehydrationComplete = () => {
  return {
    type: "REHYDRATION_COMPLETE",
    payload: null,
  };
};
