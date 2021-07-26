import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/generic/loader/loader";
import InteractionRow from "../../components/playlist-page/interaction-row";
import TracksHeader from "../../components/playlist-page/tracks-header";
import PlaylistTrackRow from "../../components/playlist-page/playlist-track-row";
import Modal from "../../components/generic/modal/modal";
import { RootState } from "../../redux/reducers";
import spotifyApi from "../../api";
import { setUri } from "../../redux/actions/playback";
import { getAverageSizeImage } from "../../utils/images";
import useContrastText from "../../hooks/utils/useContrastText";
import useEstimateTime from "../../hooks/utils/useEstimateTime";
import InfoHeader from "../../components/playlist-page/playlist-info";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(
    playlist?.images.length ? playlist?.images[0].url : ""
  );
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";
  const textSecondary = useContrastText(primaryColor)
    ? "text-gray-800"
    : "text-gray-300";
  const estimatedTime = useEstimateTime(playlist?.tracks.total);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.darkVibrant) {
      setPrimaryColor(data.darkVibrant);
      dispatch({ type: "SET_PRIMARY_COLOR", payload: data.darkVibrant });
    }
  }, [data, dispatch]);

  const fetchPlaylist = () => {
    if (accessToken) {
      spotifyApi
        .getPlaylist(id)
        .then(({ body }) => setPlaylist(body))
        .catch(() => {});
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    if (id) {
      if (accessToken && user) {
        spotifyApi.setAccessToken(accessToken);

        if (isSubscribed) fetchPlaylist();
      } else {
        axios
          .get(`http://localhost:6969/playlist/${id}`)
          .then(({ data: { body } }) =>
            isSubscribed ? setPlaylist(body) : null
          )
          .catch(() => {});
      }
    }

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line
  }, [id, accessToken, user]);

  useEffect(() => {
    if (playlist) setIsLoading(false);
  }, [playlist]);

  const handlePlay = (uri: string) => {
    if (!user || !accessToken) {
      setOpenModal(true);
    } else {
      dispatch(setUri(uri));
    }
  };

  useEffect(() => {
    setIsLoading(true);
  }, [id]);

  const playlistDetails = (
    <>
      {playlist && (
        <>
          <h3 className={`text-sm font-bold ${textPrimary}`}>
            {playlist.owner.display_name}
          </h3>

          <h3 className={`text-sm font-bold mx-2 ${textSecondary}`}>&bull;</h3>

          {playlist.followers.total > 0 && (
            <>
              <h3 className={`text-sm font-normal ${textSecondary}`}>
                {`${playlist.followers.total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                  playlist.followers.total !== 1 ? "likes" : "like"
                }`}
              </h3>
              <h3 className={`text-sm font-bold mx-2 ${textSecondary}`}>
                &bull;
              </h3>
            </>
          )}

          <h3 className={`text-sm font-normal mr-1 ${textSecondary}`}>
            {`${playlist.tracks.total} ${
              playlist.tracks.total !== 1 ? "songs" : "song"
            },`}
          </h3>

          <h3 className={`text-sm font-normal ${textSecondary}`}>
            {`about ${estimatedTime} hr`}
          </h3>
        </>
      )}
    </>
  );

  return (
    <>
      {isLoading || !playlist ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gray-700 flex flex-col h-full">
            <div
              style={{ background: primaryColor }}
              className="flex flex-row items-center justify-start h-96 p-8 pt-24"
            >
              <img
                alt="playlist cover"
                src={getAverageSizeImage(playlist.images).url}
                className="h-full w-64 object-cover shadow-2xl mr-8"
              />

              <InfoHeader
                type={playlist.type}
                name={playlist.name}
                description={playlist.description}
                detailsInfo={playlistDetails}
                primaryColor={primaryColor}
              />
            </div>

            <div
              ref={containerRef}
              style={{
                // The digits or letters after primaryColor indicate opacity in hexidecimal
                backgroundImage: `linear-gradient(${primaryColor}99, #1F2937 ${
                  playlist.tracks.total < 20 ? "25%" : "10%"
                })`,
              }}
              className="bg-gray-800 flex flex-col flex-grow px-8 pb-8"
            >
              <InteractionRow
                id={playlist.id}
                ownerId={playlist.owner.id}
                playlist={playlist}
                containerRef={containerRef}
                setOpenModal={setOpenModal}
                refetchPlaylist={fetchPlaylist}
                handlePlay={() => handlePlay(playlist.uri)}
              />

              <TracksHeader />

              {playlist?.tracks.items.map((item, index) => (
                <Fragment key={item.added_at + (item.track && item.track.id)}>
                  {item.track && (
                    <PlaylistTrackRow
                      item={item}
                      index={index}
                      playlist={playlist}
                      refetchPlaylist={fetchPlaylist}
                      handlePlay={handlePlay}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          {openModal && <Modal closeModal={() => setOpenModal(false)} />}
        </>
      )}
    </>
  );
};

export default PlaylistPage;
