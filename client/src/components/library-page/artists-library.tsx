import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import { getAverageSizeImage } from "../../utils/images";
import ContentCard from "../generic/content-card/content-card";
import ContentSection from "../generic/content-section/content-section";
import Loader from "../generic/loader/loader";

const ArtistsLibrary = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [artists, setArtists] =
    useState<SpotifyApi.UsersFollowedArtistsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getFollowedArtists({ limit: 50 })
        .then(({ body }) => setArtists(body))
        .finally(() => setIsLoading(false));
    }
  }, [accessToken]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentSection title="Artists">
          {artists?.artists.items.map((artist) => (
            <Fragment key={artist.id}>
              <ContentCard
                title={artist.name}
                subtitle={artist.type}
                url={getAverageSizeImage(artist.images).url}
                roundedVariant="rounded-full"
                onClick={() => console.log(artist.name)}
              />
            </Fragment>
          ))}
        </ContentSection>
      )}
    </>
  );
};

export default ArtistsLibrary;
