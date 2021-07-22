import { useEffect, useRef, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import spotifyApi from "../../../../api";
import { RootState } from "../../../../redux/reducers";
import NavItem from "../nav-item/nav-item";
import { setUri } from "../../../../redux/actions/playback";
import PlaylistRow from "./playlist-row";

const Playlists = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();
  const [playback, setPlayback] =
    useState<SpotifyApi.CurrentPlaybackResponse>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playlistContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <h1 className="uppercase text-gray-400 font-medium m-4">Playlists</h1>

      <NavItem
        icon={BsPlusSquareFill}
        title="Create Playlist"
        route="/playlist/:id"
      />

      <NavItem
        icon={HiHeart}
        title="Liked Songs"
        route="/collection/tracks"
        iconClasses="bg-gradient-to-br from-blue-900 via-purple-700 to-blue-300 rounded p-1 filter hover:brightness-125"
      />

      <hr className="m-4 mb-2 border-gray-600" />

      <div
        ref={playlistContainerRef}
        className="overflow-y-auto h-full pl-4 mb-20"
      >
        {playlists?.items.map((playlist) => (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            containerRef={playlistContainerRef}
          />
        ))}
      </div>
    </>
  );
};

export default Playlists;
