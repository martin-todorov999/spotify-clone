const useSmallestImage = (images: SpotifyApi.ImageObject[]) => {
  const smallestAlbumImage = images.reduce((smallest, current) => {
    if (current.height! < smallest.height!) {
      return current;
    }

    return smallest;
  }, images[0]);

  return smallestAlbumImage;
};

export default useSmallestImage;
