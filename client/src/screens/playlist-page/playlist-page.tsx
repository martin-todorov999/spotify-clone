import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import useEstimateTime from "../../hooks/utils/useEstimateTime";
import PlaylistInfo from "../../components/playlist-page/playlist-info";
import Loader from "../../components/generic/loader/loader";
import InteractionRow from "../../components/playlist-page/interaction-row";

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(playlist?.images[0].url || "");

  useEffect(() => {
    if (data.darkMuted) setPrimaryColor(data.darkMuted);
  }, [data]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6969/playlist/${id}`)
        .then(({ data: { body } }) => {
          console.log(body);
          setPlaylist(body);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <>
      {isLoading || !playlist ? (
        <Loader />
      ) : (
        <div className="bg-gray-700 flex flex-col h-full">
          <div
            style={{ background: primaryColor }}
            className="flex flex-row items-center justify-start h-96 p-8 pt-24"
          >
            <img
              alt="playlist cover"
              src={playlist?.images[0].url}
              className="h-full shadow-2xl mr-8"
            />

            <PlaylistInfo playlist={playlist} primaryColor={primaryColor} />
          </div>

          <div
            style={{
              // The digits or letters after primaryColor indicate opacity in hexidecimal
              backgroundImage: `linear-gradient(${primaryColor}99, #1F2937 10%)`,
            }}
            className="bg-gray-800 flex flex-col px-8 pb-8"
          >
            <InteractionRow playlist={playlist} />

            {playlist?.tracks.items.map((item) => (
              <h1 key={item.track.id} className="text-white">
                {item.track.name}
              </h1>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistPage;
