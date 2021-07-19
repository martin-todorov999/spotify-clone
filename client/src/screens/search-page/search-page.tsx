import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import ContentCard from "../../components/generic/content-card/content-card";
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

  console.log(searchResults);

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
    <div className="flex flex-col items-center justify-center h-full w-full">
      {searchResults?.length ? (
        searchResults?.map((result) => (
          <ContentCard
            title={result.artists[0].name}
            subtitle={result.type}
            imageUrl={result.album.images[0].url}
          />
        ))
      ) : (
        <NoSearchResults query={query} />
      )}

      {/* <ContentSection title="Your top genres" /> */}
    </div>
  );
};

export default SearchPage;
