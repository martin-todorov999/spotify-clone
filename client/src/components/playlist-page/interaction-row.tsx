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
  playlist: SpotifyApi.PlaylistObjectFull;
}

const InteractionRow = ({ playlist }: IInteractionRowProps) => {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

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
    console.log("play");

    console.log(playlist.owner.id);
  };

  const handleFollow = () => {
    if (user && !isFollowed) {
      spotifyApi.followPlaylist(playlist.id).then(() => setIsFollowed(true));
    }
  };

  const handleUnfollow = () => {
    if (user && isFollowed) {
      spotifyApi.unfollowPlaylist(playlist.id).then(() => setIsFollowed(false));
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
          onClick={handleUnfollow}
          className="text-4xl text-lime-500 rounded-full cursor-pointer mr-8"
        />
      ) : (
        <HiOutlineHeart
          onClick={handleFollow}
          className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer mr-8"
        />
      )}

      <HiOutlineDotsHorizontal
        onClick={handlePlay}
        className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer"
      />
    </div>
  );
};

export default InteractionRow;
