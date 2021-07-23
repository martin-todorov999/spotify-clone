import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import TrackCard from "../../components/generic/content-card/track-card";
import ContentSection from "../../components/generic/content-section/content-section";
import NoSearchResults from "../../components/search-page/no-search-results";
import TopResult from "../../components/search-page/top-result";
import TrackRow from "../../components/search-page/track-row";
import { RootState } from "../../redux/reducers";

const SearchPage = () => {
  const { query } = useSelector((state: RootState) => state.search);
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [searchResults, setSearchResults] =
    useState<SpotifyApi.SearchResponse | null>();
  const [popularResult, setPopularResult] = useState<
    SpotifyApi.ArtistObjectFull | SpotifyApi.TrackObjectFull
  >();

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearch = (searchQuery: string) => {
    if (accessToken) {
      spotifyApi
        .search(
          searchQuery,
          ["album", "artist", "playlist", "track", "episode"],
          { limit: 8 }
        )
        .then(({ body }) => {
          setSearchResults(body);
        });
    } else {
      axios
        .get("http://localhost:6969/search", {
          params: {
            query: searchQuery,
            types: ["album", "artist", "playlist", "track", "episode"],
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

  console.log(searchResults);

  const handlePlay = () => {};

  return (
    <>
      {searchResults ? (
        <>
          <div className="flex flex-row items-center">
            {popularResult && (
              <ContentSection title="Top result">
                <TopResult result={popularResult} />
              </ContentSection>
            )}
            <ContentSection
              title="Songs"
              containerClasses="mb-8 flex-grow"
              childrenContainerClasses="flex flex-col"
            >
              {searchResults.tracks?.items.slice(0, 4).map((track) => (
                <TrackRow track={track} handlePlay={handlePlay} />
              ))}
            </ContentSection>
          </div>

          <ContentSection title="Search results">
            {searchResults?.tracks?.items.map((result) => (
              <TrackCard key={result.id} track={result} />
            ))}
          </ContentSection>
        </>
      ) : (
        <NoSearchResults query={query} />
      )}
    </>
  );
};

export default SearchPage;
