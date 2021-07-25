import { useEffect, useRef, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import { IoRadio } from "react-icons/io5";
import { HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import spotifyApi from "../../../../api";
import { RootState } from "../../../../redux/reducers";
import NavItem from "../nav-item/nav-item";
import { setUri } from "../../../../redux/actions/playback";
import PlaylistRow from "./playlist-row";

const Playlists = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playlistContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi.getUserPlaylists({ limit: 50 }).then(({ body }) => {
        setPlaylists(body);
      });

      spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
        if (body) {
          setIsPlaying(body.is_playing);
          if (body.context && body.context.uri) {
            dispatch(setUri(body.context?.uri));
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [accessToken]);

  const createPlaylist = () => {
    if (accessToken && user) {
      spotifyApi.getUserPlaylists(user.id, { limit: 50 }).then(({ body }) => {
        const userPlaylists = body.items.filter(
          (item) => item.owner.id === user.id
        );

        spotifyApi
          .createPlaylist(`My playlist #${userPlaylists.length + 1}`)
          .then(({ body: playlist }) => {
            history.push(`/playlist/${playlist.id}`);
          });
      });
    }
  };

  return (
    <>
      <h1 className="uppercase text-gray-400 font-medium m-4">Playlists</h1>

      <div onClick={createPlaylist}>
        <NavItem
          disableActive
          icon={BsPlusSquareFill}
          title="Create Playlist"
          route={pathname}
          popup={{
            title: "Create a playlist",
            subtitle: "Log in to create and share playlists.",
          }}
        />
      </div>

      <NavItem
        disableActive
        icon={HiHeart}
        title="Liked Songs"
        route={accessToken ? "/collection/playlists" : pathname}
        iconClasses="bg-gradient-to-br from-blue-900 via-purple-700 to-blue-300 rounded p-1"
        popup={{
          title: "Liked songs",
          subtitle: "Log in to view your liked songs.",
        }}
      />

      {accessToken && (
        <NavItem
          disableActive
          icon={IoRadio}
          title="Your Episodes"
          route="/collection/podcasts"
          iconClasses="bg-gradient-to-br from-green-900 via-green-800 to-green-600 text-green-400 rounded p-1"
        />
      )}

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
