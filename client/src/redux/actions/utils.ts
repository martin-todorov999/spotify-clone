export const setPrimaryColor = (primaryColor: string) => {
  return {
    type: "SET_PRIMARY_COLOR",
    payload: primaryColor,
  };
};

export const clearPrimaryColor = () => {
  return {
    type: "CLEAR_PRIMARY_COLOR",
  };
};
