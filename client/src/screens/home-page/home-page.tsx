import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import Loader from "../../components/generic/loader/loader";
import RecentlyPlayedCard from "../../components/generic/recently-played-card/recently-played-card";
import { isFullTrack } from "../../components/search-page/track-row";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import { handleRedirectClick } from "../../utils";
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
  const [userShows, setUserShows] =
    useState<SpotifyApi.UsersSavedShowsResponse>();
  const [recommendedTracks, setRecommendedTracks] =
    useState<SpotifyApi.RecommendationsFromSeedsResponse>();

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

      spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 }).then(({ body }) => {
        setRecentlyPlayed(body);
      });

      if (user) {
        spotifyApi
          .getUserPlaylists(user.id, { limit: 8 })
          .then(({ body }) => setUserPlaylists(body));

        spotifyApi
          .getMySavedShows({ limit: 8 })
          .then(({ body }) => setUserShows(body));

        spotifyApi
          .getFeaturedPlaylists({ limit: 8, locale: "en" })
          .then(({ body }) => setFeaturedPlaylists(body));

        spotifyApi
          .getNewReleases({ limit: 8, country: "us" })
          .then(({ body }) => setNewReleases(body));
      }
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (accessToken) {
      setIsLoading(
        !(
          !!featuredPlaylists &&
          !!newReleases &&
          !!userPlaylists &&
          !!userShows
        )
      );
    } else {
      setIsLoading(!(!!featuredPlaylists && !!newReleases));
    }
  }, [accessToken, featuredPlaylists, newReleases, userPlaylists, userShows]);

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

  const handlePlay = (uri: string) => {
    if (accessToken) {
      dispatch(setUri(uri));
    }
  };

  useEffect(() => {
    if (recentlyPlayed?.items.length) {
      let artists: string[] = [];
      let tracks: string[] = [];

      recentlyPlayed?.items.forEach((item) => {
        artists = [
          ...artists,
          ...item.track.artists.map((artist) => artist.id),
        ];
        tracks = [...tracks, item.track.id];
      });

      artists = artists
        .filter((artist, index) => artists.indexOf(artist) === index)
        .slice(0, 5);
      tracks = tracks
        .filter((track, index) => artists.indexOf(track) === index)
        .slice(0, 5);

      spotifyApi
        .getRecommendations({
          seed_artists: artists,
          seed_tracks: tracks,
          min_popularity: 50,
          limit: 8,
        })
        .then(({ body }) => setRecommendedTracks(body));
    }
  }, [recentlyPlayed]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {accessToken && (
            <ContentSection title={timeOfDayGreeting()}>
              {recentlyPlayed?.items.map((item) => (
                <RecentlyPlayedCard
                  key={item.played_at}
                  track={item.track}
                  handlePlay={handlePlay}
                />
              ))}
            </ContentSection>
          )}

          {accessToken && userShows && (
            <ContentSection title="Your top shows">
              {userShows?.items.map(({ show }) => (
                <ContentCard
                  key={show.id}
                  title={show.name}
                  subtitle={show.publisher}
                  url={getAverageSizeImage(show.images).url}
                  roundedVariant="rounded-2xl"
                  handlePlay={() => handlePlay(show.uri)}
                  onClick={() => console.log(show.name)}
                />
              ))}
            </ContentSection>
          )}

          {accessToken && (
            <ContentSection title="Recently played">
              {recentlyPlayed?.items.slice(0, 8).map((item) => (
                <ContentCard
                  key={item.played_at}
                  title={item.track.name}
                  subtitle={item.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  url={
                    isFullTrack(item.track)
                      ? getAverageSizeImage(item.track.album.images).url
                      : ""
                  }
                  roundedVariant="rounded"
                  handlePlay={() => handlePlay(item.track.uri)}
                  onClick={() =>
                    handleRedirectClick(item.track.id, "album", history)
                  }
                />
              ))}
            </ContentSection>
          )}

          {accessToken && (
            <ContentSection
              title="Based on your recent listening"
              subtitle="Inspired by your recent activity."
            >
              {recommendedTracks?.tracks.map((track) => (
                <ContentCard
                  key={track.id}
                  title={track.name}
                  subtitle={track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                  url={
                    isFullTrack(track)
                      ? getAverageSizeImage(track.album.images).url
                      : ""
                  }
                  roundedVariant="rounded"
                  handlePlay={() => handlePlay(track.uri)}
                  onClick={() =>
                    handleRedirectClick(track.id, "album", history)
                  }
                />
              ))}
            </ContentSection>
          )}

          {featuredPlaylists && featuredPlaylists.playlists.items.length && (
            <ContentSection title={featuredPlaylists.message}>
              {featuredPlaylists.playlists.items.map((playlist) => (
                <ContentCard
                  key={playlist.id}
                  title={playlist.name}
                  subtitle={
                    playlist.description || `By ${playlist.owner.display_name}`
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
                  url={getAverageSizeImage(item.images).url}
                  roundedVariant="rounded"
                  handlePlay={() => handlePlay(item.uri)}
                  onClick={() => handleRedirectClick(item.id, "album", history)}
                />
              ))}
            </ContentSection>
          )}

          {accessToken && userPlaylists && (
            <ContentSection title="Your playlists">
              {userPlaylists.items.map((playlist) => (
                <ContentCard
                  key={playlist.id}
                  title={playlist.name}
                  subtitle={
                    playlist.description || `By ${playlist.owner.display_name}`
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
        </>
      )}
    </>
  );
};

export default HomePage;
