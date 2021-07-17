export const logIn = (accessToken: string) => {
  return {
    type: "LOG_IN",
    payload: accessToken,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
