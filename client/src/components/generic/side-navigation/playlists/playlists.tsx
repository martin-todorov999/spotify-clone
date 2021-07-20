import { useEffect, useState } from "react";
import { BsPlusSquareFill, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RiVolumeUpLine, RiPauseLine } from "react-icons/ri";
import spotifyApi from "../../../../api";
import { RootState } from "../../../../redux/reducers";
import NavItem from "../nav-item/nav-item";
import { setUri } from "../../../../redux/actions/playback";

const Playlists = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.session);
  const { uri } = useSelector((state: RootState) => state.playback);
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();
  const [playback, setPlayback] =
    useState<SpotifyApi.CurrentPlaybackResponse>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi.getUserPlaylists({ limit: 50 }).then(({ body }) => {
        if (body) setPlaylists(body);
      });

      spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
        if (body) {
          console.log(body);

          setPlayback(body);
          setIsPlaying(body.is_playing);

          if (body.context && body.context.uri) {
            console.log(body.context);

            dispatch(setUri(body.context?.uri));
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [accessToken]);

  const handlePause = () => {
    if (isPlaying) spotifyApi.pause().finally(() => setIsPlaying(false));
  };

  const handlePlay = () => {
    if (!isPlaying) spotifyApi.play().finally(() => setIsPlaying(true));
  };

  return (
    <>
      <h1 className="uppercase text-gray-400 font-medium m-4">Playlists</h1>

      <NavItem
        icon={BsPlusSquareFill}
        title="Create Playlist"
        route="/playlist/:id"
      />

      <NavItem
        icon={BsHeartFill}
        title="Liked Songs"
        route="/collection/tracks"
      />

      <hr className="m-4 mb-2 border-gray-600" />

      <div className="overflow-y-auto h-full pl-4 mb-20">
        {playlists?.items.map((playlist) => (
          <div
            key={playlist.id}
            className="flex flex-row justify-between items-center mb-2"
          >
            <h3 className="text-gray-400 hover:text-white text-md line-clamp-1 mr-2">
              {playlist.name}
            </h3>

            {playlist.uri === uri &&
              (isPlaying ? (
                <RiVolumeUpLine
                  onClick={handlePause}
                  className="text-gray-400 hover:text-white cursor-pointer text-lg mr-2"
                />
              ) : (
                <RiPauseLine
                  onClick={handlePlay}
                  className="text-gray-400 hover:text-white cursor-pointer text-lg mr-2"
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlists;
