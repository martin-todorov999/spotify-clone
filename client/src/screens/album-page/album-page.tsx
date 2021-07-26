import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import spotifyApi from "../../api";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";
import TracksHeader from "../../components/playlist-page/tracks-header";
import InteractionRow from "../../components/playlist-page/interaction-row";
import Modal from "../../components/generic/modal/modal";
import TrackRow from "../../components/search-page/track-row";
import { setUri } from "../../redux/actions/playback";
import useContrastText from "../../hooks/utils/useContrastText";
import useEstimateTime from "../../hooks/utils/useEstimateTime";
import { parseDuration } from "../../components/playlist-page/playlist-track-row";
import InfoHeader from "../../components/playlist-page/playlist-info";
import { getAverageSizeImage } from "../../utils/images";

const AlbumPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const { uri: stateUri } = useSelector((state: RootState) => state.playback);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();
  const [playbackState, setPlaybackState] =
    useState<SpotifyApi.CurrentPlaybackResponse>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(album?.images[0].url || "");
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";
  const textSecondary = useContrastText(primaryColor)
    ? "text-gray-800"
    : "text-gray-300";
  const estimatedTime = useEstimateTime(album?.tracks.total);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.darkVibrant) {
      setPrimaryColor(data.darkVibrant);
      dispatch({ type: "SET_PRIMARY_COLOR", payload: data.darkVibrant });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (id) {
      if (accessToken && user) {
        spotifyApi.setAccessToken(accessToken);

        spotifyApi
          .getAlbum(id)
          .then(({ body }) => setAlbum(body))
          .catch(() => {});
      } else {
        axios
          .get(`http://localhost:6969/albums/${id}`)
          .then(({ data: { body } }) => {
            setAlbum(body);
          })
          .catch(() => {});
      }
    }
  }, [id, accessToken, user]);

  useEffect(() => {
    if (album) setIsLoading(false);
  }, [album]);

  const handlePlay = (uri: string) => {
    if (!user || !accessToken) {
      setOpenModal(true);
    } else {
      dispatch(setUri(uri));
    }
  };

  useEffect(() => {
    if (accessToken) {
      spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
        setPlaybackState(body);
      });
    }
  }, [accessToken, stateUri]);

  const albumDetails = (
    <>
      {album && (
        <>
          {album.artists.map((artist, index, array) => (
            <Fragment key={artist.id}>
              <h3 className={`text-sm font-bold mr-2 ${textPrimary}`}>
                {artist.name}
              </h3>

              <h3
                className={`text-sm font-bold mr-2 ${
                  array.length - 1 !== index ? textPrimary : textSecondary
                }`}
              >
                &bull;
              </h3>
            </Fragment>
          ))}

          <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
            {album?.release_date.split("-")[0]}
          </h3>

          <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>&bull;</h3>

          <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
            {`${album.tracks.total} ${
              album.tracks.total !== 1 ? "songs" : "song"
            },`}
          </h3>

          <h3 className={`text-sm font-normal ${textSecondary}`}>
            {album.tracks.total === 1
              ? parseDuration(album.tracks.items[0].duration_ms, true)
              : `about ${estimatedTime} hr`}
          </h3>
        </>
      )}
    </>
  );

  return (
    <>
      {isLoading || !album ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gray-700 flex flex-col h-full">
            <div
              style={{ background: primaryColor }}
              className="flex flex-col lg:flex-row items-center justify-start h-min lg:h-96 p-8 pt-24"
            >
              <img
                alt="playlist cover"
                src={getAverageSizeImage(album?.images).url}
                className="h-64 w-64 object-cover shadow-2xl lg:mr-8"
              />

              <InfoHeader
                type={album.album_type}
                name={album.name}
                detailsInfo={albumDetails}
                primaryColor={primaryColor}
              />
            </div>

            <div
              ref={containerRef}
              style={{
                // The digits or letters after primaryColor indicate opacity in hexidecimal
                backgroundImage: `linear-gradient(${primaryColor}99, #1F2937 ${
                  album.tracks.total < 20 ? "50%" : "25%"
                })`,
              }}
              className="bg-gray-800 flex flex-col flex-grow px-8 pb-8"
            >
              <InteractionRow
                id={album.id}
                containerRef={containerRef}
                setOpenModal={setOpenModal}
                handlePlay={() => handlePlay(album.uri)}
              />

              <TracksHeader simplified />

              {album?.tracks.items.map((item, index) => (
                <div key={item.id}>
                  <TrackRow
                    track={item}
                    index={index}
                    trackCount={album.tracks.total}
                    playbackState={playbackState}
                    handlePlay={handlePlay}
                  />
                </div>
              ))}
            </div>
          </div>
          {openModal && <Modal closeModal={() => setOpenModal(false)} />}
        </>
      )}
    </>
  );
};

export default AlbumPage;
