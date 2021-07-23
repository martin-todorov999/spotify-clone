import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import spotifyApi from "../../api";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";
import PlaylistInfo from "../../components/playlist-page/playlist-info";

const AlbumPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(album?.images[0].url || "");

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

  console.log(album);

  return (
    <>
      {isLoading || !album ? (
        <Loader />
      ) : (
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
            style={{
              // The digits or letters after primaryColor indicate opacity in hexidecimal
              backgroundImage: `linear-gradient(${primaryColor}99, #1F2937 10%)`,
            }}
            className="bg-gray-800 flex flex-col flex-grow px-8 pb-8"
          >
            {/* <InteractionRow
              playlist={playlist}
              setOpenModal={setOpenModal}
              handlePlay={handlePlay}
            />

            <TracksHeader />

            {playlist?.tracks.items.map((item, index) => (
              <Fragment key={item.track && item.track.id}>
                {item.track && (
                  <TrackRow item={item} index={index} handlePlay={handlePlay} />
                )}
              </Fragment>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumPage;
