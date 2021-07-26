import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import spotifyApi from "../../api";
import PlaylistInfo from "../../components/playlist-page/playlist-info";
import { RootState } from "../../redux/reducers";
import { getAverageSizeImage } from "../../utils/images";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [followedArtists, setFollowedArtists] =
    useState<SpotifyApi.UsersFollowedArtistsResponse>();

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getFollowedArtists({ limit: 8 }).then(({ body }) => {
        setFollowedArtists(body);
      });
    }
  }, [accessToken]);

  const userDetails = (
    <>
      <h3 className="text-sm font-normal text-gray-400">{`${user?.country} public playlists`}</h3>
      <h3 className="text-sm font-bold mx-2 text-gray-400">&bull;</h3>

      <h3 className="text-sm font-normal text-white">{`${user?.followers?.total} followers`}</h3>
      <h3 className="text-sm font-bold mx-2 text-gray-400">&bull;</h3>

      <h3 className="text-sm font-normal text-white">{`${
        followedArtists?.artists.total || 0
      } following`}</h3>
    </>
  );

  return (
    <>
      {user && id === user.id && (
        <div className="flex flex-col h-full">
          <div className="bg-gray-700 flex flex-row items-center justify-start h-96 p-8 pt-24">
            <img
              alt="playlist cover"
              src={getAverageSizeImage(user?.images || []).url}
              className="h-full w-64 object-cover shadow-2xl rounded-full mr-8"
            />

            <PlaylistInfo
              type="profile"
              name={user.display_name || user.id}
              detailsInfo={userDetails}
              primaryColor="#374151"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
