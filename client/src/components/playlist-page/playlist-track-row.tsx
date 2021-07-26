import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BsPlayFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import useSortImages from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";
import ContextMenu from "../generic/context-menu/context-menu";
import { IDropDownItem } from "../generic/dropdown/dropdown";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import TrackDuration from "./track-duration";

TimeAgo.addDefaultLocale(en);

interface IPlaylistTrackRowProps {
  item: SpotifyApi.PlaylistTrackObject;
  index: number;
  playlist: SpotifyApi.PlaylistObjectFull;
  refetchPlaylist: () => void;
  handlePlay: (uri: string) => void;
}

export const parseDuration = (milliseconds: number, verbose?: boolean) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return `${minutes}${verbose ? " min " : ":"}${
    Number(seconds) < 10 ? "0" : ""
  }${seconds}${verbose ? " sec" : ""}`;
};

const PlaylistTrackRow = ({
  item,
  index,
  playlist,
  refetchPlaylist,
  handlePlay,
}: IPlaylistTrackRowProps) => {
  const timeAgo = new TimeAgo("en-US");
  const history = useHistory();
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [hover, setHover] = useState<boolean>(false);
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const [screenX, setScreenX] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState<boolean>();
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const smallestImage = useSortImages(item.track.album.images)[0];

  useEffect(() => {
    let isSubscribed = true;

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      if (playlist.tracks.total < 50 || hover) {
        spotifyApi
          .containsMySavedTracks([item.track.id])
          .then(({ body }) => (isSubscribed ? setIsLiked(body[0]) : null));
      }

      if (user) {
        spotifyApi
          .getUserPlaylists(user.id, { limit: 10 })
          .then(({ body }) =>
            isSubscribed
              ? setUserPlaylists(
                  body.items
                    .filter(
                      (playlistItem) =>
                        playlistItem.owner.id === user.id &&
                        playlistItem.id !== playlist.id
                    )
                    .slice(0, 5)
                )
              : null
          );
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [
    accessToken,
    user,
    hover,
    item.track.id,
    playlist.tracks.total,
    playlist.id,
  ]);

  const handleLikeSong = () => {
    if (accessToken) {
      if (isLiked) {
        spotifyApi.removeFromMySavedTracks([item.track.id]).finally(() => {
          setIsLiked(false);
          setContextMenuOpen(false);
        });
      } else {
        spotifyApi.addToMySavedTracks([item.track.id]).finally(() => {
          setIsLiked(true);
          setContextMenuOpen(false);
        });
      }
    }
  };

  const handleRemoveFromPlaylist = () => {
    if (accessToken && user && playlist.owner.id === user.id) {
      spotifyApi
        .removeTracksFromPlaylist(playlist.id, [{ uri: item.track.uri }])
        .finally(() => refetchPlaylist());
    }
  };

  const handleAddToPlaylist = (playlistId: string) => {
    if (accessToken) {
      spotifyApi
        .addTracksToPlaylist(playlistId, [item.track.uri])
        .finally(() => setContextMenuOpen(false));
    }
  };

  const playlistMenuItems: IDropDownItem[] =
    userPlaylists?.map((userPlaylist) => {
      const menuItem: IDropDownItem = {
        isNested: true,
        title: userPlaylist.name,
        onClick: () => handleAddToPlaylist(userPlaylist.id),
      };

      return menuItem;
    }) || [];

  const contextMenuItems: IDropDownItem[] = [
    {
      title: "Add to queue",
      onClick: () => handlePlay(item.track.uri),
      divider: true,
    },
    {
      title: "Go to album",
      onClick: () => history.push(`/album/${item.track.album.id}`),
      divider: true,
    },
    {
      title: isLiked
        ? "Remove from your Liked Songs"
        : "Save to your Liked Songs",
      onClick: handleLikeSong,
    },
    {
      title: "Remove from this playlist",
      onClick: handleRemoveFromPlaylist,
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
        className="flex flex-row text-gray-400 hover:bg-gray-700 py-2 rounded-md"
      >
        <div className="w-16 flex flex-row items-center justify-center">
          <h3 className="text-lg font-normal">
            {hover ? (
              <BsPlayFill
                onClick={() => handlePlay(item.track.uri)}
                className="text-white text-2xl cursor-pointer"
              />
            ) : (
              index + 1
            )}
          </h3>
        </div>
        <div className="w-6/12 flex flex-row items-center justify-start pr-2">
          <img
            alt="art"
            src={smallestImage ? smallestImage.url : ""}
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

        <TrackDuration
          duration={parseDuration(item.track.duration_ms)}
          hover={hover}
          isLiked={!!isLiked}
          showLikedOnHover={playlist.tracks.total > 50}
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

export default PlaylistTrackRow;
