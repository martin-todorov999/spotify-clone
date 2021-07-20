import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "../../components/generic/content-card/content-card";
import PlaylistCard from "../../components/generic/content-card/playlist-card";
import ContentSection from "../../components/generic/content-section/content-section";
import { RootState } from "../../redux/reducers";

const HomePage = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse>();

  useEffect(() => {
    if (!accessToken) {
      axios
        .get("http://localhost:6969/featured-playlists")
        .then(({ data: { body } }) => {
          setFeaturedPlaylists(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <>
      {!accessToken && featuredPlaylists && featuredPlaylists.message && (
        <ContentSection title={featuredPlaylists.message}>
          {featuredPlaylists.playlists.items.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </ContentSection>
      )}
    </>
  );
};

export default HomePage;
