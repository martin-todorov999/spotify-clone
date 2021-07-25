import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BsPlayFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { HiHeart } from "react-icons/hi";
import useSortImages from "../../hooks/utils/useSortImages";
import TrackArtists from "../generic/track-row/track-artists";
import ContextMenu from "../generic/context-menu/context-menu";
import { IDropDownItem } from "../generic/dropdown/dropdown";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import ContextButton from "../generic/context-button/context-button";

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

  const smallestImage = useSortImages(item.track.album.images)[0];

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi
        .containsMySavedTracks([item.track.id])
        .then(({ body }) => setIsLiked(body[0]));
    }
  }, [accessToken, item.track.id]);

  const handleLikeSong = () => {
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
  };

  const handleRemoveFromPlaylist = () => {
    if (user && playlist.owner.id === user.id) {
      spotifyApi
        .removeTracksFromPlaylist(playlist.id, [{ uri: item.track.uri }])
        .finally(() => refetchPlaylist());
    }
  };

  const contextMenuItems: IDropDownItem[] = [
    {
      title: "Add to queue",
      onClick: () => handlePlay(item.track.uri),
    },
    {
      title: "Go to album",
      onClick: () => history.push(`/album/${item.track.album.id}`),
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
        <div className="w-32 flex flex-row items-center justify-evenly">
          <HiHeart
            className={`text-lime-500 text-lg ${!isLiked && "invisible"}`}
          />
          {parseDuration(item.track.duration_ms)}
          <ContextButton
            iconClasses={`text-lg ${!hover && "invisible"}`}
            menuItems={contextMenuItems}
            containerRef={containerRef}
          />
        </div>
      </div>

      {contextMenuOpen && (
        <ContextMenu
          mouseX={mouseX}
          mouseY={mouseY}
          screenX={screenX}
          screenY={screenY}
          containerRef={containerRef}
          menuItems={contextMenuItems}
          disableInvertY
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}
    </>
  );
};

export default PlaylistTrackRow;
