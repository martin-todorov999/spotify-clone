export const setTrackUri = (uri: string) => {
  return {
    type: "SET_TRACK_URI",
    payload: uri,
  };
};

export const clearTrackUri = () => {
  return {
    type: "CLEAR_TRACK_URI",
  };
};
