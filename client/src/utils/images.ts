export const sortImages = (images: SpotifyApi.ImageObject[]) => {
  const sorted = images.sort(function (imageA, imageB) {
    if (imageA.height && imageB.height) {
      return imageA.height > imageB.height ? 1 : -1;
    }
    return -1;
  });

  return sorted;
};

export const getAverageSizeImage = (images: SpotifyApi.ImageObject[]) => {
  const sortedImages = sortImages(images);

  return sortedImages[Math.round((sortedImages.length - 1) / 2) || 0];
};
