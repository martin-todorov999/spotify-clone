import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-node";
import ContentCard from "../../components/generic/content-card/content-card";
import ContentSection from "../../components/generic/content-section/content-section";
import { ISearchResult } from "../../components/generic/search-field/search-field";
import { RootState } from "../../redux/reducers";

const SearchPage = () => {
  const spotifyApi = useMemo(
    () =>
      new SpotifyWebApi({
        clientId: "d1b6a57fb43949f5b15ff1f50e47e764",
      }),
    []
  );
  const { query } = useSelector((state: RootState) => state.search);
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >([]);
  const { accessToken } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken, spotifyApi]);

  console.log(searchResults);

  // const smallestAlbumImage = track.album.images.reduce((smallest, current) => {
  //   if (current.height! < smallest.height!) {
  //     return current;
  //   }

  //   return smallest;
  // }, track.album.images[0]);

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
      {searchResults?.map((result) => (
        <ContentCard
          title={result.artists[0].name}
          subtitle={result.type}
          imageUrl={result.album.images[0].url}
        />
      ))}
      {/* <ContentSection title="Your top genres" /> */}
    </>
  );
};

export default SearchPage;
