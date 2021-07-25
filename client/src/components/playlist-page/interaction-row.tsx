import { RiPlayCircleFill } from "react-icons/ri";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RefObject, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import { IDropDownItem } from "../generic/dropdown/dropdown";
import EditPlaylistModal from "../generic/side-navigation/playlists/edit-playlist-modal";
import { setUri } from "../../redux/actions/playback";
import ContextButton from "../generic/context-button/context-button";

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
  const [openEditPlaylist, setOpenEditPlaylist] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleDeletePlaylist = () => {
    if (accessToken) {
      spotifyApi.unfollowPlaylist(id).finally(() => history.push("/"));
    }
  };

  useEffect(() => {
    if (playlist && ownerId && user) {
      spotifyApi
        .areFollowingPlaylist(ownerId, id, [user.id])
        .then(({ body }) => setIsLiked(body[0]));
    } else {
      spotifyApi
        .containsMySavedAlbums([id])
        .then(({ body }) => setIsLiked(body[0]));
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
    } else if (isLiked) {
      spotifyApi.removeFromMySavedAlbums([id]).then(() => setIsLiked(false));
    } else {
      spotifyApi.addToMySavedAlbums([id]).then(() => setIsLiked(true));
    }
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
      title:
        playlist?.owner.id === user?.id ? "Delete" : "Remove from Your Library",
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

      <ContextButton menuItems={contextMenuItems} containerRef={containerRef} />

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
