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
    useState<SpotifyApi.TrackObjectFull[]>();
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();
  const [userShows, setUserShows] =
    useState<SpotifyApi.UsersSavedShowsResponse>();
  const [recommendedTracks, setRecommendedTracks] =
    useState<SpotifyApi.MultipleTracksResponse>();

  useEffect(() => {
    let isSubscribed = true;

    if (!accessToken) {
      axios
        .get("http://localhost:6969/browse/featured-playlists")
        .then(({ data: { body } }) =>
          isSubscribed ? setFeaturedPlaylists(body) : null
        )
        .catch(() => {});

      axios
        .get("http://localhost:6969/browse/new-releases")
        .then(({ data: { body } }) =>
          isSubscribed ? setNewReleases(body) : null
        )
        .catch(() => {});
    } else {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then(({ body }) => {
        spotifyApi
          .getTracks(body.items.map((item) => item.track.id))
          .then(({ body: tracks }) => {
            if (isSubscribed) {
              const deduplicatedTracks = tracks.tracks
                .filter(
                  (track, index, self) =>
                    index === self.findIndex((item) => item.id === track.id)
                )
                .slice(0, 10);

              setRecentlyPlayed(deduplicatedTracks);
            }
          });
      });

      if (user) {
        spotifyApi
          .getUserPlaylists(user.id, { limit: 8 })
          .then(({ body }) => (isSubscribed ? setUserPlaylists(body) : null));

        spotifyApi
          .getMySavedShows({ limit: 8 })
          .then(({ body }) => (isSubscribed ? setUserShows(body) : null));

        spotifyApi
          .getFeaturedPlaylists({ limit: 8, locale: "en" })
          .then(({ body }) =>
            isSubscribed ? setFeaturedPlaylists(body) : null
          );

        spotifyApi
          .getNewReleases({ limit: 8, country: "us" })
          .then(({ body }) => (isSubscribed ? setNewReleases(body) : null));
      }
    }

    return () => {
      isSubscribed = false;
    };
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
    let isSubscribed = true;

    if (recentlyPlayed?.length) {
      let artists: string[] = [];
      let tracks: string[] = [];

      recentlyPlayed?.forEach((track) => {
        artists = [...artists, ...track.artists.map((artist) => artist.id)];
        tracks = [...tracks, track.id];
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
        .then(({ body }) => {
          spotifyApi
            .getTracks(body.tracks.map((track) => track.id))
            .then(({ body: tracksResponse }) =>
              isSubscribed ? setRecommendedTracks(tracksResponse) : null
            );
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [recentlyPlayed]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {accessToken && recentlyPlayed?.length && (
            <ContentSection title={timeOfDayGreeting()}>
              {recentlyPlayed?.map((track) => (
                <RecentlyPlayedCard
                  key={track.id}
                  track={track}
                  handlePlay={handlePlay}
                  onClick={() =>
                    handleRedirectClick(track.album.id, "album", history)
                  }
                />
              ))}
            </ContentSection>
          )}

          {accessToken && userShows?.items.length && (
            <ContentSection title="Your top shows">
              {userShows?.items.map(({ show }) => (
                <ContentCard
                  key={show.id}
                  title={show.name}
                  subtitle={show.publisher}
                  url={getAverageSizeImage(show.images).url}
                  roundedVariant="rounded-2xl"
                  handlePlay={() => handlePlay(show.uri)}
                  onClick={() => null}
                />
              ))}
            </ContentSection>
          )}

          {accessToken && recentlyPlayed?.length && (
            <ContentSection title="Recently played">
              {recentlyPlayed?.slice(0, 8).map((track) => (
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
                    handleRedirectClick(track.album.id, "album", history)
                  }
                />
              ))}
            </ContentSection>
          )}

          {accessToken && recommendedTracks?.tracks.length && (
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
                    handleRedirectClick(track.album.id, "album", history)
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

          {accessToken && userPlaylists?.items.length && (
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
