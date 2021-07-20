export const setUri = (uri: string) => {
  return {
    type: "SET_URI",
    payload: uri,
  };
};

export const clearUri = () => {
  return {
    type: "CLEAR_URI",
  };
};
