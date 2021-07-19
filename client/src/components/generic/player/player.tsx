import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpotifyPlayer from "react-spotify-web-playback";
import { RootState } from "../../../redux/reducers";

const Player = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const { trackUri } = useSelector((state: RootState) => state.playback);
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  return accessToken && trackUri ? (
    <div className="absolute bottom-0 w-full">
      <SpotifyPlayer
        token={accessToken}
        uris={[trackUri]}
        showSaveIcon
        play={play}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        styles={{
          height: "5rem",
          bgColor: "#111827",
          activeColor: "#65A30D",
          color: "#FFFFFF",
          trackNameColor: "#FFFFFF",
          trackArtistColor: "#9CA3AF",
          sliderColor: "#84CC16",
          sliderHandleColor: "#65A30D",
          sliderTrackColor: "#FFFFFF",
          loaderColor: "#65A30D",
          sliderHeight: 8,
        }}
      />
    </div>
  ) : null;
};

export default Player;
