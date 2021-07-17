export const setQuery = (query: string) => {
  return {
    type: "SET_QUERY",
    payload: query,
  };
};

export const clearQuery = () => {
  return {
    type: "CLEAR_QUERY",
  };
};
