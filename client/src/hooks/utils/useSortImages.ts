const useSortImages = (images: SpotifyApi.ImageObject[]) => {
  const sorted = images.sort(function (imageA, imageB) {
    if (imageA.height && imageB.height) {
      return imageA.height > imageB.height ? 1 : -1;
    }
    return -1;
  });

  return sorted;
};

export default useSortImages;
