import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import { useDispatch } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import PlaylistInfo from "../../components/playlist-page/playlist-info";
import Loader from "../../components/generic/loader/loader";
import InteractionRow from "../../components/playlist-page/interaction-row";
import TracksHeader from "../../components/playlist-page/tracks-header";

TimeAgo.addDefaultLocale(en);

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(playlist?.images[0].url || "");
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    if (data.darkVibrant) {
      setPrimaryColor(data.darkVibrant);
      dispatch({ type: "SET_PRIMARY_COLOR", payload: data.darkVibrant });
    }
  }, [data, dispatch]);

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

  const getSmallestImage = (images: SpotifyApi.ImageObject[]) => {
    const sorted = images.sort(function (imageA, imageB) {
      if (imageA.height && imageB.height) {
        return imageA.height > imageB.height ? 1 : -1;
      }
      return -1;
    });

    return sorted[0];
  };

  const parseDuration = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

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

            <TracksHeader />

            {playlist?.tracks.items.map((item, index) => (
              <div
                key={item.track.id}
                className="flex flex-row text-gray-400 hover:bg-gray-700 py-2 rounded-md"
              >
                <div className="w-16 flex flex-row items-center justify-center">
                  <h3 className="text-lg font-normal uppercase">{index + 1}</h3>
                </div>
                <div className="w-6/12 flex flex-row items-center justify-start pr-2">
                  <img
                    alt="album art"
                    src={getSmallestImage(item.track.album.images).url}
                    className="h-10 w-10 rounded-sm mr-4"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-1 line-clamp-1">
                      {item.track.name}
                    </h3>

                    <h3 className="text-xs font-normal tracking-widest uppercase line-clamp-1">
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </h3>
                  </div>
                </div>
                <div className="w-4/12 flex flex-row items-center justify-start pr-2">
                  <h3 className="text-xs font-normal tracking-widest uppercase line-clamp-1">
                    {item.track.album.name}
                  </h3>
                </div>
                <div className="w-2/12 flex flex-row items-center justify-start">
                  <h3 className="text-xs font-normal tracking-widest uppercase">
                    {timeAgo.format(new Date(item.added_at))}
                  </h3>
                </div>
                <div className="w-32 flex flex-row items-center justify-center">
                  {parseDuration(item.track.duration_ms)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistPage;
