import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import NoSearchResults from "../../components/search-page/no-search-results";
import TopResult from "../../components/search-page/top-result";
import TrackRow from "../../components/search-page/track-row";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import handleRedirectClick from "../../utils";

const SearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.search);
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [searchResults, setSearchResults] =
    useState<SpotifyApi.SearchResponse | null>();
  const [popularResult, setPopularResult] = useState<
    SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull
  >();
  const [noResults, setNoResults] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearch = (searchQuery: string) => {
    if (accessToken) {
      spotifyApi
        .search(searchQuery, ["album", "artist", "playlist", "track"], {
          limit: 8,
        })
        .then(({ body }) => {
          setSearchResults(body);
        });
    } else {
      axios
        .get("http://localhost:6969/search", {
          params: {
            query: searchQuery,
            types: ["album", "artist", "playlist", "track"],
            limit: 8,
          },
        })
        .then(({ data: { body } }) => {
          setSearchResults(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setNoResults(
      !searchResults?.albums?.items.length &&
        !searchResults?.artists?.items.length &&
        !searchResults?.episodes?.items.length &&
        !searchResults?.playlists?.items.length &&
        !searchResults?.tracks?.items.length
    );
  }, [searchResults]);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      setSearchResults(null);
    }
    // eslint-disable-next-line
  }, [query, accessToken]);

  useEffect(() => {
    if (searchResults?.artists || searchResults?.tracks) {
      let mostPopular:
        | SpotifyApi.ArtistObjectFull
        | SpotifyApi.TrackObjectFull
        | undefined;

      if (searchResults.artists) {
        searchResults.artists.items.forEach((artist) => {
          if (!mostPopular || artist.popularity > mostPopular.popularity)
            mostPopular = artist;
        });
      }

      if (searchResults.tracks) {
        searchResults.tracks.items.forEach((track) => {
          if (!mostPopular || track.popularity > mostPopular.popularity)
            mostPopular = track;
        });
      }

      setPopularResult(mostPopular);
    }
  }, [searchResults?.artists, searchResults?.tracks]);

  const handlePlay = (uri: string) => {
    if (accessToken) {
      dispatch(setUri(uri));
    }
  };

  return (
    <>
      {!query || noResults ? (
        <NoSearchResults query={query} />
      ) : (
        searchResults && (
          <>
            <div className="flex flex-col md:flex-row items-center">
              {popularResult && (
                <ContentSection
                  title="Top result"
                  containerClasses="mb-8 w-full md:w-min md:mr-4"
                >
                  <TopResult result={popularResult} handlePlay={handlePlay} />
                </ContentSection>
              )}
              {searchResults.tracks?.items.length && (
                <ContentSection
                  title="Songs"
                  containerClasses="mb-8 flex-grow"
                  childrenContainerClasses="flex flex-col"
                >
                  {searchResults.tracks?.items.slice(0, 4).map((track) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      handlePlay={handlePlay}
                    />
                  ))}
                </ContentSection>
              )}
            </div>

            {searchResults.artists?.items.length && (
              <ContentSection title="Artists">
                {searchResults?.artists?.items.map((result) => (
                  <ContentCard
                    key={result.id}
                    title={result.name}
                    subtitle={result.type}
                    url={
                      result.images.length ? result.images[0].url : undefined
                    }
                    roundedVariant="rounded-full"
                    onClick={() => console.log("artists")}
                  />
                ))}
              </ContentSection>
            )}

            {searchResults.albums?.items.length && (
              <ContentSection title="Albums">
                {searchResults?.albums?.items.map((result) => (
                  <ContentCard
                    key={result.id}
                    title={result.name}
                    subtitle={result.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                    url={
                      result.images.length ? result.images[0].url : undefined
                    }
                    roundedVariant="rounded"
                    onClick={() =>
                      handleRedirectClick(result.id, "album", history)
                    }
                    handlePlay={() => handlePlay(result.uri)}
                  />
                ))}
              </ContentSection>
            )}

            {searchResults.playlists?.items.length && (
              <ContentSection title="Playlists">
                {searchResults?.playlists?.items.map((result) => (
                  <ContentCard
                    key={result.id}
                    title={result.name}
                    subtitle={`By ${result.owner.display_name || "unknown"}`}
                    url={
                      result.images.length ? result.images[0].url : undefined
                    }
                    roundedVariant="rounded"
                    onClick={() =>
                      handleRedirectClick(result.id, "playlist", history)
                    }
                  />
                ))}
              </ContentSection>
            )}
          </>
        )
      )}
    </>
  );
};

export default SearchPage;
