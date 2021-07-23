import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "../../components/generic/content-card/content-card";
import PlaylistCard from "../../components/generic/content-card/playlist-card";
import ContentSection from "../../components/generic/content-section/content-section";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";

const HomePage = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [featuredPlaylists, setFeaturedPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse>();
  const [newReleases, setNewReleases] =
    useState<SpotifyApi.ListOfNewReleasesResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!accessToken) {
      axios
        .get("http://localhost:6969/browse/featured-playlists")
        .then(({ data: { body } }) => {
          setFeaturedPlaylists(body);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:6969/browse/new-releases")
        .then(({ data: { body } }) => {
          setNewReleases(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (featuredPlaylists && newReleases) setIsLoading(false);
  }, [featuredPlaylists, newReleases]);

  return (
    <>
      {isLoading || !featuredPlaylists ? (
        <Loader />
      ) : (
        !accessToken && (
          <>
            {featuredPlaylists.playlists.items.length && (
              <ContentSection title={featuredPlaylists.message}>
                {featuredPlaylists.playlists.items.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
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
                    url={item.images[0].url}
                    roundedVariant="rounded"
                    onClick={() => console.log(item)}
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

export default HomePage;
