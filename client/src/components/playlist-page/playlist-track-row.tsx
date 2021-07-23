import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BsPlayFill } from "react-icons/bs";
import { MdExplicit } from "react-icons/md";
import { useState } from "react";
import { useSortImages } from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";

TimeAgo.addDefaultLocale(en);

interface IPlaylistTrackRowProps {
  item: SpotifyApi.PlaylistTrackObject;
  index: number;
  handlePlay: (id: string) => void;
}

const PlaylistTrackRow = ({
  item,
  index,
  handlePlay,
}: IPlaylistTrackRowProps) => {
  const timeAgo = new TimeAgo("en-US");
  const [hover, setHover] = useState<boolean>(false);

  const smallestImage = useSortImages(item.track.album.images)[0];

  const parseDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-row text-gray-400 hover:bg-gray-700 py-2 rounded-md"
    >
      <div className="w-16 flex flex-row items-center justify-center">
        <h3 className="text-lg font-normal">
          {hover ? (
            <BsPlayFill
              onClick={() => handlePlay(item.track.id)}
              className="text-white text-2xl cursor-pointer"
            />
          ) : (
            index + 1
          )}
        </h3>
      </div>
      <div className="w-6/12 flex flex-row items-center justify-start pr-2">
        <img
          alt="album art"
          src={smallestImage.url}
          className="h-10 w-10 rounded-sm mr-4"
        />
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white text-sm font-medium tracking-wide line-clamp-1">
            {item.track.name}
          </h3>

          <TrackArtists track={item.track} />
        </div>
      </div>
      <div className="w-4/12 flex flex-row items-center justify-start pr-2">
        <h3 className="text-sm font-normal tracking-wide line-clamp-1">
          {item.track.album.name}
        </h3>
      </div>
      <div className="w-2/12 flex flex-row items-center justify-start">
        <h3 className="text-sm font-normal tracking-wide">
          {timeAgo.format(new Date(item.added_at))}
        </h3>
      </div>
      <div className="w-32 flex flex-row items-center justify-center">
        {parseDuration(item.track.duration_ms)}
      </div>
    </div>
  );
};

export default PlaylistTrackRow;
