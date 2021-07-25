import { RiPlayCircleFill } from "react-icons/ri";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RefObject, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import ContextMenu from "../generic/context-menu/context-menu";
import { IDropDownItem } from "../generic/dropdown/dropdown";
import EditPlaylistModal from "../generic/side-navigation/playlists/edit-playlist-modal";
import { setUri } from "../../redux/actions/playback";

interface IInteractionRowProps {
  id: string;
  ownerId?: string;
  playlist?: SpotifyApi.PlaylistObjectFull;
  containerRef: RefObject<HTMLDivElement>;
  refetchPlaylist?: () => void;
  handlePlay: () => void;
  setOpenModal: (open: boolean) => void;
}

const InteractionRow = ({
  id,
  ownerId,
  playlist,
  containerRef,
  refetchPlaylist,
  handlePlay,
  setOpenModal,
}: IInteractionRowProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showLikeButton, setShowLikeButton] = useState<boolean>(true);
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const [openEditPlaylist, setOpenEditPlaylist] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleDeletePlaylist = () => {
    if (accessToken) {
      spotifyApi.unfollowPlaylist(id).finally(() => history.push("/"));
    }
  };

  useEffect(() => {
    if (user && ownerId && playlist) {
      spotifyApi
        .areFollowingPlaylist(ownerId, id, [user.id])
        .then(({ body }) => {
          setIsLiked(body[0]);
        });
    }
  }, [user, id, ownerId, playlist]);

  useEffect(() => {
    setShowLikeButton(playlist ? ownerId !== user?.id : true);
  }, [playlist, ownerId, user]);

  const handleFollowButton = () => {
    if (!user || !accessToken) {
      return setOpenModal(true);
    }

    if (playlist) {
      if (isLiked) {
        spotifyApi.unfollowPlaylist(id).then(() => setIsLiked(false));
      } else {
        spotifyApi.followPlaylist(id).then(() => setIsLiked(true));
      }
    }
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();

    setMouseX(
      (buttonRef.current?.offsetLeft &&
        buttonRef.current?.clientWidth &&
        buttonRef.current?.offsetLeft - buttonRef.current?.clientWidth) ||
        event.clientX
    );
    setMouseY(
      (buttonRef.current?.offsetTop &&
        buttonRef.current?.clientHeight &&
        buttonRef.current?.offsetTop + buttonRef.current?.clientHeight) ||
        event.clientY
    );
    setScreenY(event.screenY);
    setContextMenuOpen(true);
  };

  const contextMenuItems: IDropDownItem[] = [
    {
      title: "Add to queue",
      onClick: () => playlist && dispatch(setUri(playlist.uri)),
    },
    {
      title: "Edit details",
      onClick: () => setOpenEditPlaylist(true),
    },
    {
      title: "Delete",
      onClick: handleDeletePlaylist,
    },
  ];

  return (
    <div className="py-8 flex flex-row items-center justify-start">
      <RiPlayCircleFill
        onClick={handlePlay}
        className="text-7xl text-lime-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 ease-in-out mr-8"
      />

      {showLikeButton &&
        (user && isLiked ? (
          <HiHeart
            onClick={handleFollowButton}
            className="text-4xl text-lime-500 rounded-full cursor-pointer mr-8"
          />
        ) : (
          <HiOutlineHeart
            onClick={handleFollowButton}
            className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer mr-8"
          />
        ))}

      <div ref={buttonRef}>
        <HiOutlineDotsHorizontal
          onClick={handleContextMenu}
          className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer"
        />
      </div>

      {contextMenuOpen && (
        <ContextMenu
          menuItems={contextMenuItems}
          mouseX={mouseX}
          mouseY={mouseY}
          screenY={screenY}
          containerRef={containerRef}
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}

      {openEditPlaylist && playlist && refetchPlaylist && (
        <EditPlaylistModal
          playlist={playlist}
          refetchPlaylist={refetchPlaylist}
          closeModal={() => setOpenEditPlaylist(false)}
        />
      )}
    </div>
  );
};

export default InteractionRow;
