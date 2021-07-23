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

interface IInteractionRowProps {
  id: string;
  ownerId?: string;
  isPlaylist?: boolean;
  handlePlay: () => void;
  setOpenModal: (open: boolean) => void;
}

const InteractionRow = ({
  id,
  ownerId,
  isPlaylist,
  handlePlay,
  setOpenModal,
}: IInteractionRowProps) => {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showLikeButton, setShowLikeButton] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (user && ownerId && isPlaylist) {
      spotifyApi
        .areFollowingPlaylist(ownerId, id, [user.id])
        .then(({ body }) => {
          setIsLiked(body[0]);
        });
    }
  }, [user, id, ownerId, isPlaylist]);

  useEffect(() => {
    setShowLikeButton(isPlaylist ? ownerId !== user?.id : true);
  }, [isPlaylist, ownerId, user]);

  const handleFollowButton = () => {
    if (!user || !accessToken) {
      return setOpenModal(true);
    }

    if (isPlaylist) {
      if (isLiked) {
        spotifyApi.unfollowPlaylist(id).then(() => setIsLiked(false));
      } else {
        spotifyApi.followPlaylist(id).then(() => setIsLiked(true));
      }
    }
  };

  return (
    <div className="py-8 flex flex-row items-center justify-start">
      <RiPlayCircleFill
        onClick={() => handlePlay()}
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

      <HiOutlineDotsHorizontal className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer" />
    </div>
  );
};

export default InteractionRow;
