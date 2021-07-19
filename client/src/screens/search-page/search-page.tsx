import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import NoSearchResults from "../../components/search-page/no-search-results";
import { RootState } from "../../redux/reducers";

const SearchPage = () => {
  const { query } = useSelector((state: RootState) => state.search);
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >([]);
  const { accessToken } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearch = _.debounce((searchQuery: string) => {
    spotifyApi.searchTracks(searchQuery).then((res) => {
      setSearchResults(res.body.tracks?.items);
    });
  }, 500);

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
            <ContentCard key={result.id} item={result} />
          ))}
        </ContentSection>
      ) : (
        <NoSearchResults query={query} />
      )}
    </>
  );
};

export default SearchPage;
