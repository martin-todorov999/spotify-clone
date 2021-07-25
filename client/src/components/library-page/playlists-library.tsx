import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import spotifyApi from "../../api";
import { setUri } from "../../redux/actions/playback";
import { RootState } from "../../redux/reducers";
import { handleRedirectClick } from "../../utils";
import { getAverageSizeImage } from "../../utils/images";
import ContentCard from "../generic/content-card/content-card";
import ContentSection from "../generic/content-section/content-section";
import Loader from "../generic/loader/loader";
import HighlightCard from "./highlight-card";

const PlaylistsLibrary = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfUsersPlaylistsResponse>();
  const [savedTracks, setSavedTracks] =
    useState<SpotifyApi.UsersSavedTracksResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken && user) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getUserPlaylists(user.id, { limit: 50 })
        .then(({ body }) => setPlaylists(body));
      spotifyApi
        .getMySavedTracks({ limit: 8 })
        .then(({ body }) => setSavedTracks(body));
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (playlists && savedTracks) setIsLoading(false);
  }, [playlists, savedTracks]);

  const handlePlay = (uri: string) => {
    if (accessToken) {
      dispatch(setUri(uri));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentSection title="Playlists">
          <HighlightCard
            title="Liked songs"
            subtitle="liked songs"
            savedItems={savedTracks}
            colors={{
              from: "from-blue-800",
              via: "via-indigo-500",
              to: "to-purple-400",
            }}
          />

          {playlists?.items.map((playlist) => (
            <ContentCard
              key={playlist.id}
              title={playlist.name}
              subtitle={
                playlist.description || `By ${playlist.owner.display_name}`
              }
              url={getAverageSizeImage(playlist.images).url}
              roundedVariant="rounded"
              handlePlay={() => handlePlay(playlist.uri)}
              onClick={() =>
                handleRedirectClick(playlist.id, "playlist", history)
              }
            />
          ))}
        </ContentSection>
      )}
    </>
  );
};

export default PlaylistsLibrary;
