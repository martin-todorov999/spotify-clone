import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import spotifyApi from "../../api";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";
import PlaylistInfo from "../../components/playlist-page/playlist-info";
import TracksHeader from "../../components/playlist-page/tracks-header";
import InteractionRow from "../../components/playlist-page/interaction-row";
import Modal from "../../components/generic/modal/modal";
import TrackRow from "../../components/search-page/track-row";
import { setUri } from "../../redux/actions/playback";

const AlbumPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(album?.images[0].url || "");
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

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
          .catch((error) => console.log(error));
      } else {
        axios
          .get(`http://localhost:6969/albums/${id}`)
          .then(({ data: { body } }) => {
            setAlbum(body);
          })
          .catch((error) => {
            console.log(error);
          });
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

  return (
    <>
      {isLoading || !album ? (
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
                src={album?.images[0].url}
                className="h-full shadow-2xl mr-8"
              />

              <PlaylistInfo
                type={album.album_type}
                name={album.name}
                artists={album.artists}
                year={album.release_date.split("-")[0]}
                tracksCount={
                  album.album_type === "single" ? 1 : album.tracks.total
                }
                trackDuration={
                  album.album_type === "single"
                    ? album.tracks.items[0].duration_ms
                    : undefined
                }
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
                <div key={item.id} ref={contextRef}>
                  <TrackRow
                    track={item}
                    index={index}
                    containerRef={contextRef}
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
