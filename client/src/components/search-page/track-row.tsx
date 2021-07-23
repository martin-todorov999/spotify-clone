import { BsPlayFill } from "react-icons/bs";
import { MdExplicit } from "react-icons/md";
import { useState } from "react";
import { useSortImages } from "../../hooks/utils/useSortImages";

interface ITrackRowProps {
  track: SpotifyApi.TrackObjectFull;
  handlePlay: (id: string) => void;
}

const TrackRow = ({ track, handlePlay }: ITrackRowProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const smallestImage = useSortImages(track.album.images)[0];

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
        <h3 className="text-lg font-normal uppercase">
          {hover && (
            <BsPlayFill
              onClick={() => handlePlay(track.id)}
              className="text-white text-2xl cursor-pointer"
            />
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
          <h3 className="text-white text-xs font-medium tracking-wide uppercase mb-1 line-clamp-1">
            {track.name}
          </h3>

          <div className="flex flex-row items-center">
            {track.explicit && <MdExplicit className="mr-1" />}
            <h3 className="text-xs font-normal tracking-wide uppercase line-clamp-1">
              {track.artists.map((artist) => artist.name).join(", ")}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-4/12 flex flex-row items-center justify-start pr-2">
        <h3 className="text-xs font-normal tracking-wide uppercase line-clamp-1">
          {track.album.name}
        </h3>
      </div>
      <div className="w-32 flex flex-row items-center justify-center">
        {parseDuration(track.duration_ms)}
      </div>
    </div>
  );
};

export default TrackRow;
