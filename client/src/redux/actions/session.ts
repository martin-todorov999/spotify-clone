export const logIn = (accessToken: string) => {
  return {
    type: "LOG_IN",
    payload: accessToken,
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
