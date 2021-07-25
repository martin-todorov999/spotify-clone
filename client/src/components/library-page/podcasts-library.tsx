import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import { handleRedirectClick } from "../../utils";
import { getAverageSizeImage } from "../../utils/images";
import ContentCard from "../generic/content-card/content-card";
import ContentSection from "../generic/content-section/content-section";
import Loader from "../generic/loader/loader";
import HighlightCard from "./highlight-card";

const PodcastsLibrary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [shows, setShows] = useState<SpotifyApi.UsersSavedShowsResponse>();
  const [savedEpisodes, setSavedEpisodes] =
    useState<SpotifyApi.UsersSavedEpisodesResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken && user) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getMySavedShows({ limit: 50 })
        .then(({ body }) => setShows(body));

      // For seome reason spotifyApi has no method to get users saved episodes
      axios
        .get("https://api.spotify.com/v1/me/episodes", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(({ data }) => setSavedEpisodes(data));
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (shows && savedEpisodes) setIsLoading(false);
  }, [shows, savedEpisodes]);

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
        <ContentSection title="Playlists">
          <HighlightCard
            title="Your episodes"
            subtitle="episodes"
            savedItems={savedEpisodes}
            colors={{
              from: "from-green-800",
              via: "via-green-700",
              to: "to-green-500",
            }}
          />

          {shows?.items.map(({ show }) => (
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
    </>
  );
};

export default PodcastsLibrary;
