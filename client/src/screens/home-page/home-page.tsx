import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import Loader from "../../components/generic/loader/loader";
import RecentlyPlayedCard from "../../components/generic/recently-played-card/recently-played-card";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import handleRedirectClick from "../../utils";
import { getAverageSizeImage } from "../../utils/images";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse>();
  const [newReleases, setNewReleases] =
    useState<SpotifyApi.ListOfNewReleasesResponse>();
  const [recentlyPlayed, setRecentlyPlayed] =
    useState<SpotifyApi.UsersRecentlyPlayedTracksResponse>();
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();

  useEffect(() => {
    if (!accessToken) {
      axios
        .get("http://localhost:6969/browse/featured-playlists")
        .then(({ data: { body } }) => {
          setFeaturedPlaylists(body);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:6969/browse/new-releases")
        .then(({ data: { body } }) => {
          setNewReleases(body);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi
        .getMyRecentlyPlayedTracks({ limit: 10 })
        .then(({ body }) => {
          setRecentlyPlayed(body);
        })
        .finally(() => setIsLoading(false));

      if (user)
        spotifyApi.getUserPlaylists(user.id, { limit: 8 }).then(({ body }) => {
          setUserPlaylists(body);
        });
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (featuredPlaylists && newReleases) setIsLoading(false);
  }, [featuredPlaylists, newReleases]);

  const timeOfDayGreeting = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 6 && currentTime < 12) {
      return "Good morning";
    }
    if (currentTime >= 12 && currentTime < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  const handlePlayTrack = (uri: string) => {
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
          {accessToken ? (
            <>
              <ContentSection title={timeOfDayGreeting()}>
                {recentlyPlayed?.items.map((item) => (
                  <RecentlyPlayedCard
                    key={item.played_at}
                    track={item.track}
                    handlePlay={handlePlayTrack}
                  />
                ))}
              </ContentSection>

              {userPlaylists && (
                <ContentSection title="Your playlists">
                  {userPlaylists.items.map((playlist) => (
                    <ContentCard
                      key={playlist.id}
                      title={playlist.name}
                      subtitle={
                        playlist.description ||
                        `By ${playlist.owner.display_name}`
                      }
                      url={getAverageSizeImage(playlist.images).url}
                      roundedVariant="rounded"
                      onClick={() =>
                        handleRedirectClick(playlist.id, "playlist", history)
                      }
                      handlePlay={() => handlePlayTrack(playlist.id)}
                    />
                  ))}
                </ContentSection>
              )}
            </>
          ) : (
            <>
              {featuredPlaylists && featuredPlaylists.playlists.items.length && (
                <ContentSection title={featuredPlaylists.message}>
                  {featuredPlaylists.playlists.items.map((playlist) => (
                    <ContentCard
                      key={playlist.id}
                      title={playlist.name}
                      subtitle={
                        playlist.description ||
                        `By ${playlist.owner.display_name}`
                      }
                      url={getAverageSizeImage(playlist.images).url}
                      roundedVariant="rounded"
                      onClick={() =>
                        handleRedirectClick(playlist.id, "playlist", history)
                      }
                      handlePlay={() => handlePlayTrack(playlist.id)}
                    />
                  ))}
                </ContentSection>
              )}

              {newReleases?.albums.items.length && (
                <ContentSection
                  title={newReleases.message || "Popular new releases"}
                >
                  {newReleases.albums.items.map((item) => (
                    <ContentCard
                      key={item.id}
                      title={item.name}
                      subtitle={item.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                      url={item.images[0].url}
                      roundedVariant="rounded"
                      onClick={() =>
                        handleRedirectClick(item.id, "album", history)
                      }
                    />
                  ))}
                </ContentSection>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
