import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSortImages from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";

interface ITrackRowProps {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  index?: number;
  handlePlay: (uri: string) => void;
}

export const isFullTrack = (
  item: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
): item is SpotifyApi.TrackObjectFull => {
  return (item as SpotifyApi.TrackObjectFull).album !== undefined;
};

const TrackRow = ({ track, index, handlePlay }: ITrackRowProps) => {
  const trackIndex = index || 0;
  const [hover, setHover] = useState<boolean>(false);
  const { uri } = useSelector((state: RootState) => state.playback);
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [showPause, setShowPause] = useState<boolean>(false);

  const smallestImage = useSortImages(
    isFullTrack(track) ? track.album.images : []
  )[0];

  const parseDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayTrack = () => {
    handlePlay(track.uri);
    setShowPause(true);
  };

  const handlePause = () => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.pause();
      setShowPause(false);
    }
  };

  useEffect(() => {
    setShowPause(uri === track.uri);
  }, [uri, track.uri]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-row text-gray-400 hover:bg-gray-700 p-2 rounded-md justify-between"
    >
      <div className="w-full md:w-6/12 flex flex-row items-center justify-start pr-2">
        <div className="relative flex items-center justify-center mr-4">
          {isFullTrack(track) ? (
            <>
              <img
                alt="album art"
                src={smallestImage.url}
                className={`h-10 w-10 rounded-sm ${
                  hover && "filter brightness-50"
                }`}
              />
              {hover && (
                <BsPlayFill
                  onClick={handlePlayTrack}
                  className="absolute text-white text-2xl cursor-pointer"
                />
              )}
            </>
          ) : (
            <div className="h-10 w-10 flex items-center justify-center">
              <h3 className="text-lg font-normal">
                {showPause ? (
                  <BsPauseFill
                    onClick={handlePause}
                    className="text-lime-500 text-2xl cursor-pointer"
                  />
                ) : (
                  <>
                    {hover ? (
                      <BsPlayFill
                        onClick={handlePlayTrack}
                        className="text-white text-2xl cursor-pointer"
                      />
                    ) : (
                      trackIndex + 1
                    )}
                  </>
                )}
              </h3>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white text-sm font-medium tracking-wide line-clamp-1">
            {track.name}
          </h3>

          <TrackArtists track={track} />
        </div>
      </div>

      <div className="w-min md:w-32 flex flex-row items-center justify-center">
        {parseDuration(track.duration_ms)}
      </div>
    </div>
  );
};

export default TrackRow;
