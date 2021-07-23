import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import TrackCard from "../../components/generic/content-card/track-card";
import ContentSection from "../../components/generic/content-section/content-section";
import NoSearchResults from "../../components/search-page/no-search-results";
import { RootState } from "../../redux/reducers";

const SearchPage = () => {
  const { query } = useSelector((state: RootState) => state.search);
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >([]);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearch = (searchQuery: string) => {
    spotifyApi.searchTracks(searchQuery).then((res) => {
      setSearchResults(res.body.tracks?.items);
    });
  };

  useEffect(() => {
    if (accessToken && query) {
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line
  }, [query, accessToken]);

  return (
    <>
      {searchResults?.length ? (
        <ContentSection title="Search results">
          {searchResults?.map((result) => (
            <TrackCard key={result.id} track={result} />
          ))}
        </ContentSection>
      ) : (
        <NoSearchResults query={query} />
      )}
    </>
  );
};

export default SearchPage;
