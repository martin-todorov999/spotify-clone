import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useSortImages from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import { IDropDownItem } from "../generic/dropdown/dropdown";
import ContextMenu from "../generic/context-menu/context-menu";
import TrackDuration from "../playlist-page/track-duration";

interface ITrackRowProps {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  index?: number;
  trackCount: number;
  playbackState?: SpotifyApi.CurrentPlaybackResponse;
  handlePlay: (uri: string) => void;
}

export const isFullTrack = (
  item: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
): item is SpotifyApi.TrackObjectFull => {
  return (item as SpotifyApi.TrackObjectFull).album !== undefined;
};

const TrackRow = ({
  track,
  index,
  trackCount,
  playbackState,
  handlePlay,
}: ITrackRowProps) => {
  const history = useHistory();
  const trackIndex = index || 0;
  const [hover, setHover] = useState<boolean>(false);
  const { uri } = useSelector((state: RootState) => state.playback);
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [showPause, setShowPause] = useState<boolean>(false);
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const [screenX, setScreenX] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const smallestImage = useSortImages(
    isFullTrack(track) ? track.album.images : []
  )[0];

  const parseDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let isSubscribed = true;

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      if (trackCount < 50 || hover) {
        spotifyApi
          .containsMySavedTracks([track.id])
          .then(({ body }) => (isSubscribed ? setIsLiked(body[0]) : null));
      }

      if (user) {
        spotifyApi
          .getUserPlaylists(user.id, { limit: 10 })
          .then(({ body }) =>
            isSubscribed
              ? setUserPlaylists(
                  body.items
                    .filter((item) => item.owner.id === user.id)
                    .slice(0, 5)
                )
              : null
          );
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [accessToken, user, trackCount, hover, track.id]);

  const handlePlayTrack = () => {
    handlePlay(track.uri);
    setShowPause(true);
  };

  const handlePause = () => {
    if (accessToken) {
      spotifyApi.pause();
      setShowPause(false);
    }
  };

  const handleLikeSong = () => {
    if (accessToken) {
      if (isLiked) {
        spotifyApi.removeFromMySavedTracks([track.id]).finally(() => {
          setIsLiked(false);
          setContextMenuOpen(false);
        });
      } else {
        spotifyApi.addToMySavedTracks([track.id]).finally(() => {
          setIsLiked(true);
          setContextMenuOpen(false);
        });
      }
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (accessToken) {
      spotifyApi
        .addTracksToPlaylist(playlistId, [track.uri])
        .finally(() => setContextMenuOpen(false));
    }
  };

  useEffect(() => {
    setShowPause(
      !!playbackState && playbackState.is_playing && uri === track.uri
    );
  }, [playbackState, uri, track.uri]);

  const playlistMenuItems: IDropDownItem[] =
    userPlaylists?.map((playlist) => {
      const menuItem: IDropDownItem = {
        isNested: true,
        title: playlist.name,
        onClick: () => handleAddToPlaylist(playlist.id),
      };

      return menuItem;
    }) || [];

  const contextMenuItems: IDropDownItem[] = [
    {
      title: "Add to queue",
      onClick: () => handlePlay(track.uri),
      divider: true,
    },
    {
      title: "Go to album",
      onClick: () =>
        isFullTrack(track) && history.push(`/album/${track.album.id}`),
      divider: true,
    },
    {
      title: isLiked
        ? "Remove from your Liked Songs"
        : "Save to your Liked Songs",
      onClick: handleLikeSong,
    },
    {
      title: "Add to playlist...",
      hoverElement: playlistMenuItems,
      onClick: () => null,
    },
  ];

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();

    setMouseX(event.clientX - 256);
    setMouseY(event.clientY);
    setScreenY(event.screenY);
    setScreenX(event.screenX);
    setContextMenuOpen(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        onContextMenu={handleContextMenu}
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

        <TrackDuration
          duration={parseDuration(track.duration_ms)}
          hover={hover}
          isLiked={!!isLiked}
          showLikedOnHover={trackCount > 50}
          handleLikeSong={handleLikeSong}
          contextMenuItems={contextMenuItems}
          containerRef={containerRef}
        />
      </div>

      {contextMenuOpen && (
        <ContextMenu
          mouseX={mouseX}
          mouseY={mouseY}
          screenX={screenX}
          screenY={screenY}
          containerRef={containerRef}
          menuItems={contextMenuItems}
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}
    </>
  );
};

export default TrackRow;
