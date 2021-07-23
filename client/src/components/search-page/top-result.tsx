import { useState } from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import { useAverageSizeImage } from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";

interface ITopResultProps {
  result: SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull;
}

const TopResult = ({ result }: ITopResultProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const isArtist = (
    item: SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull
  ): item is SpotifyApi.ArtistObjectFull => {
    return item.type === "artist";
  };

  const image = useAverageSizeImage(
    isArtist(result) ? result.images : result.album.images
  );

  const handlePlay = () => {};

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="hover:bg-gradient-to-tl from-gray-700 to-gray-800 hover:shadow-xl h-full w-96 rounded p-6 text-white transition duration-200 ease-in-out cursor-pointer flex flex-col break-words"
    >
      <img
        src={image.url}
        alt="avatar"
        className={`${
          isArtist(result) ? "rounded-full" : "rounded"
        } h-24 w-24 mb-4`}
      />

      <div className="flex flex-row items-end justify-between">
        <div>
          <h1 className="font-bold text-3xl mb-2 line-clamp-1">
            {result.name}
          </h1>

          <div className="flex items-center">
            {!isArtist(result) && <TrackArtists track={result} />}
            <h6
              className={`font-bold text-xs uppercase bg-gray-800 rounded-full py-1 px-4 w-min tracking-widest ${
                !isArtist(result) && "ml-2"
              }`}
            >
              {isArtist(result) ? result.type : "song"}
            </h6>
          </div>
        </div>

        {hover && (
          <RiPlayCircleFill
            onClick={handlePlay}
            className="text-6xl text-lime-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 ease-in-out"
          />
        )}
      </div>
    </div>
  );
};

export default TopResult;
