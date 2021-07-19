import useSortImages from "../../../hooks/utils/useSortImages";

interface IContentCardProps {
  item: SpotifyApi.TrackObjectFull;
}

const ContentCard = ({ item }: IContentCardProps) => {
  // let roundedVariant = "rounded-sm";

  // if (variant === "podcast") roundedVariant = "rounded-3xl";
  // if (variant === "artist") roundedVariant = "rounded-full";

  const images = useSortImages(item.album.images);

  return (
    <div className="bg-gray-700 rounded-lg p-4 min-w-32 min-h-32 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer flex flex-col">
      {/* <div
        style={{ paddingBottom: "100%" }}
        className={`bg-gray-500 ${roundedVariant} w-full relative mb-4`}
      > */}
      <img
        alt="media"
        src={images[Math.round((images.length - 1) / 2) || 0].url}
        className="h-full w-full object-contain"
      />
      {/* </div> */}
      <h1 className="text-white">{item.name}</h1>
      <h3 className="text-gray-400">{item.type}</h3>
    </div>
  );
};

export default ContentCard;
