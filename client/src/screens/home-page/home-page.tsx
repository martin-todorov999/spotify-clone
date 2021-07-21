import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlaylistCard from "../../components/generic/content-card/playlist-card";
import ContentSection from "../../components/generic/content-section/content-section";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";

const HomePage = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!accessToken) {
      axios
        .get("http://localhost:6969/featured-playlists")
        .then(({ data: { body } }) => {
          setFeaturedPlaylists(body);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [accessToken]);

  return (
    <>
      {isLoading || !featuredPlaylists ? (
        <Loader />
      ) : (
        !accessToken &&
        featuredPlaylists.message && (
          <ContentSection title={featuredPlaylists.message}>
            {featuredPlaylists.playlists.items.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </ContentSection>
        )
      )}
    </>
  );
};

export default HomePage;
