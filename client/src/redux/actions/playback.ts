export const setUri = (uri: string) => {
  return {
    type: "SET_URI",
    payload: uri,
  };
};

export const setAlbumUri = (albumUri: string) => {
  return {
    type: "SET_ALBUM_URI",
    payload: albumUri,
  };
};

export const clearUri = () => {
  return {
    type: "CLEAR_URI",
  };
};
