export const sortImages = (images: SpotifyApi.ImageObject[]) => {
  const sorted = images.sort((imageA, imageB) => {
    if (imageA.height && imageB.height) {
      return imageA.height > imageB.height ? 1 : -1;
    }
    return -1;
  });

  return sorted;
};

export const getAverageSizeImage = (images: SpotifyApi.ImageObject[]) => {
  if (!images.length) return { url: "https://i.stack.imgur.com/y9DpT.jpg" };

  const sortedImages = sortImages(images);

  return sortedImages[Math.round((sortedImages.length - 1) / 2) || 0];
};
