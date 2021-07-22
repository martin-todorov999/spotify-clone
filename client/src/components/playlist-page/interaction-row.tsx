import { RiPlayCircleFill } from "react-icons/ri";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import Modal from "../generic/modal/modal";

interface IInteractionRowProps {
  playlist: SpotifyApi.PlaylistObjectFull;
}

const InteractionRow = ({ playlist }: IInteractionRowProps) => {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      spotifyApi
        .areFollowingPlaylist(playlist.owner.id, playlist.id, [user.id])
        .then(({ body }) => {
          setIsFollowed(body[0]);
        });
    }
  }, [user, playlist.id, playlist.owner.id]);

  const handlePlay = () => {
    if (!user || !accessToken) setOpenModal(true);

    console.log(playlist.owner.id);
  };

  const handleFollowButton = () => {
    if (!user || !accessToken) {
      return setOpenModal(true);
    }

    if (isFollowed) {
      spotifyApi.unfollowPlaylist(playlist.id).then(() => setIsFollowed(false));
    } else {
      spotifyApi.followPlaylist(playlist.id).then(() => setIsFollowed(true));
    }
  };

  return (
    <div className="py-8 flex flex-row items-center justify-start">
      <RiPlayCircleFill
        onClick={handlePlay}
        className="text-6xl text-lime-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 ease-in-out mr-8"
      />

      {isFollowed && user ? (
        <HiHeart
          onClick={handleFollowButton}
          className="text-4xl text-lime-500 rounded-full cursor-pointer mr-8"
        />
      ) : (
        <HiOutlineHeart
          onClick={handleFollowButton}
          className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer mr-8"
        />
      )}

      <HiOutlineDotsHorizontal
        onClick={handlePlay}
        className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer"
      />

      {openModal && <Modal closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default InteractionRow;
