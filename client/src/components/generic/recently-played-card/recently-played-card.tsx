import { useState } from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import { useSortImages } from "../../../hooks/utils/useSortImages";
import { isFullTrack } from "../../search-page/track-row";

interface IRecentlyPlayedCardProps {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  handlePlay: (uri: string) => void;
}

const RecentlyPlayedCard = ({
  track,
  handlePlay,
}: IRecentlyPlayedCardProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const smallestImage = useSortImages(
    isFullTrack(track) ? track.album.images : []
  )[0];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="hover:bg-gradient-to-tl from-gray-600 bg-gray-700 flex flex-row items-center h-20 w-72 relative rounded shadow-md cursor-pointer"
    >
      {isFullTrack(track) && (
        <img
          src={smallestImage.url}
          alt="cover"
          className="shadow-lg h-full rounded object-cover"
        />
      )}

      <div className="flex items-center p-4 pr-16">
        <h1 className="text-white font-bold line-clamp-2">{track.name}</h1>
      </div>

      {hover && (
        <RiPlayCircleFill
          onClick={() => handlePlay(track.uri)}
          className="absolute right-0 mr-4 text-5xl text-lime-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 ease-in-out"
        />
      )}
    </div>
  );
};

export default RecentlyPlayedCard;
