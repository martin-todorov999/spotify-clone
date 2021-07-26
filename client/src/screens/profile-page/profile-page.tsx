import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import Loader from "../../components/generic/loader/loader";
import InfoHeader from "../../components/playlist-page/playlist-info";
import TrackRow from "../../components/search-page/track-row";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import { handleRedirectClick } from "../../utils";
import { getAverageSizeImage } from "../../utils/images";

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [followedArtists, setFollowedArtists] =
    useState<SpotifyApi.UsersFollowedArtistsResponse>();
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();
  const [topArtists, setTopArtists] =
    useState<SpotifyApi.UsersTopArtistsResponse>();
  const [topTracks, setTopTracks] =
    useState<SpotifyApi.UsersTopTracksResponse>();
  const [recentArtists, setRecentArtists] =
    useState<SpotifyApi.MultipleArtistsResponse>();

  useEffect(() => {
    let isSubscribed = true;

    if (accessToken && user) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getFollowedArtists({ limit: 8 })
        .then(({ body }) => (isSubscribed ? setFollowedArtists(body) : null));

      spotifyApi
        .getUserPlaylists(user.id, { limit: 50 })
        .then(({ body }) =>
          isSubscribed
            ? setUserPlaylists(
                body.items.filter(
                  (item) => item.owner.id === user.id && item.public
                )
              )
            : null
        );

      spotifyApi
        .getMyTopArtists({ time_range: "short_term", limit: 8 })
        .then(({ body }) => (isSubscribed ? setTopArtists(body) : null));

      spotifyApi
        .getMyTopTracks({ time_range: "short_term", limit: 4 })
        .then(({ body }) => (isSubscribed ? setTopTracks(body) : null));

      spotifyApi.getMyRecentlyPlayedTracks().then(({ body }) => {
        if (isSubscribed) {
          const artistIds = _.uniq(
            body.items.map(({ track }) => track.artists[0].id)
          );

          spotifyApi
            .getArtists(artistIds)
            .then(({ body: artists }) => setRecentArtists(artists))
            .finally(() => setIsLoading(false));
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [accessToken, user]);

  const userDetails = (
    <>
      <h3 className="text-sm font-normal text-gray-400">{`${
        userPlaylists ? userPlaylists.length : 0
      } public playlists`}</h3>
      <h3 className="text-sm font-bold mx-2 text-gray-400">&bull;</h3>

      <h3 className="text-sm font-normal text-white">{`${user?.followers?.total} followers`}</h3>
      <h3 className="text-sm font-bold mx-2 text-gray-400">&bull;</h3>

      <h3 className="text-sm font-normal text-white">{`${
        followedArtists?.artists.total || 0
      } following`}</h3>
    </>
  );

  const handlePlay = (uri: string) => {
    if (accessToken) {
      dispatch(setUri(uri));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {user && id === user.id && (
            <div className="flex flex-col h-full">
              <div className="bg-gray-700 flex flex-row items-center justify-start h-96 p-8 pt-24">
                <img
                  alt="playlist cover"
                  src={getAverageSizeImage(user?.images || []).url}
                  className="h-full w-64 object-cover shadow-2xl rounded-full mr-8"
                />

                <InfoHeader
                  type="profile"
                  name={user.display_name || user.id}
                  detailsInfo={userDetails}
                  primaryColor="#374151"
                />
              </div>

              <div className="bg-gray-800 flex flex-col flex-grow p-8">
                {topArtists?.items.length && (
                  <ContentSection
                    title="Top artists this month"
                    subtitle="Only visible to you"
                  >
                    {topArtists.items.map((artist) => (
                      <ContentCard
                        key={artist.id}
                        title={artist.name}
                        subtitle={artist.type}
                        url={getAverageSizeImage(artist.images).url}
                        roundedVariant="rounded-full"
                      />
                    ))}
                  </ContentSection>
                )}

                {topTracks?.items.length && (
                  <ContentSection
                    title="Top tracks this month"
                    subtitle="Only visible to you"
                    childrenContainerClasses="flex flex-col"
                  >
                    {topTracks.items.map((track) => (
                      <TrackRow
                        key={track.id}
                        track={track}
                        trackCount={topTracks.total}
                        handlePlay={() => handlePlay(track.uri)}
                      />
                    ))}
                  </ContentSection>
                )}

                {userPlaylists && userPlaylists.length && (
                  <ContentSection title="Public playlists">
                    {userPlaylists.map((playlist) => (
                      <ContentCard
                        key={playlist.id}
                        title={playlist.name}
                        subtitle={
                          playlist.description ||
                          `By ${playlist.owner.display_name}`
                        }
                        url={getAverageSizeImage(playlist.images).url}
                        roundedVariant="rounded"
                        handlePlay={() => handlePlay(playlist.id)}
                        onClick={() =>
                          handleRedirectClick(playlist.id, "playlist", history)
                        }
                      />
                    ))}
                  </ContentSection>
                )}

                {recentArtists?.artists && recentArtists.artists.length && (
                  <ContentSection title="Recently played artists">
                    {recentArtists.artists.map((artist) => (
                      <ContentCard
                        key={artist.id}
                        title={artist.name}
                        subtitle={artist.type}
                        url={getAverageSizeImage(artist.images).url}
                        roundedVariant="rounded-full"
                      />
                    ))}
                  </ContentSection>
                )}

                {followedArtists && followedArtists.artists.items.length && (
                  <ContentSection title="Following">
                    {followedArtists.artists.items.map((artist) => (
                      <ContentCard
                        key={artist.id}
                        title={artist.name}
                        subtitle={artist.type}
                        url={getAverageSizeImage(artist.images).url}
                        roundedVariant="rounded-full"
                      />
                    ))}
                  </ContentSection>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
