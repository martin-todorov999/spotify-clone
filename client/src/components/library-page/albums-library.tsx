import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import { handleRedirectClick } from "../../utils";
import { getAverageSizeImage } from "../../utils/images";
import ContentCard from "../generic/content-card/content-card";
import ContentSection from "../generic/content-section/content-section";
import Loader from "../generic/loader/loader";

const AlbumsLibrary = () => {
  const history = useHistory();
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [albums, setAlbums] = useState<SpotifyApi.UsersSavedAlbumsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getMySavedAlbums({ limit: 50 })
        .then(({ body }) => setAlbums(body))
        .finally(() => setIsLoading(false));
    }
  }, [accessToken]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentSection title="Artists">
          {albums?.items.map((album) => (
            <Fragment key={album.album.id}>
              <ContentCard
                title={album.album.name}
                subtitle={album.album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
                url={getAverageSizeImage(album.album.images).url}
                roundedVariant="rounded-full"
                onClick={() =>
                  handleRedirectClick(album.album.id, "album", history)
                }
              />
            </Fragment>
          ))}
        </ContentSection>
      )}
    </>
  );
};

export default AlbumsLibrary;
