import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePalette } from "react-palette";
import useContrastText from "../../hooks/utils/useContrastText";
import useEstimateTime from "../../hooks/utils/useEstimateTime";

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(playlist?.images[0].url || "");
  const estimatedTime = useEstimateTime(playlist?.tracks.total);

  useEffect(() => {
    if (data.darkVibrant) setPrimaryColor(data.darkVibrant);
  }, [data]);

  useEffect(() => {
    setIsFeatured(playlist?.owner.id === "spotify");
  }, [playlist?.owner.id]);

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
        });
    }
  }, [id]);

  console.log(estimatedTime);

  return (
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

        <div className="h-full w-full pt-8 flex flex-col justify-end">
          <h6
            className={`uppercase text-xs font-bold ${
              useContrastText(primaryColor) ? "text-gray-900" : "text-white"
            }`}
          >
            {playlist?.type}
          </h6>

          <h1
            className={`uppercase text-6xl xl:text-8xl font-black my-4 ${
              useContrastText(primaryColor) ? "text-gray-900" : "text-white"
            }`}
          >
            {playlist?.name}
          </h1>

          <h3
            className={`text-sm font-normal mb-2 ${
              useContrastText(primaryColor) ? "text-gray-800" : "text-gray-300"
            }`}
          >
            {playlist?.description}
          </h3>

          <div className="flex flex-row items-center">
            <h3
              className={`text-sm font-bold mr-2 ${
                useContrastText(primaryColor) ? "text-gray-900" : "text-white"
              }`}
            >
              {playlist?.owner.display_name}
            </h3>

            <h3
              className={`text-sm font-bold mr-2 ${
                useContrastText(primaryColor)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              &bull;
            </h3>

            <h3
              className={`text-sm font-normal mr-2 ${
                useContrastText(primaryColor)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              {playlist?.followers.total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {" likes"}
            </h3>

            <h3
              className={`text-sm font-bold mr-2 ${
                useContrastText(primaryColor)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              &bull;
            </h3>

            <h3
              className={`text-sm font-normal mr-2 ${
                useContrastText(primaryColor)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              {playlist?.tracks.total}
              {" songs,"}
            </h3>

            <h3
              className={`text-sm font-normal ${
                useContrastText(primaryColor)
                  ? "text-gray-800"
                  : "text-gray-300"
              }`}
            >
              {"about "}
              {estimatedTime}
              {" hr"}
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/3 ...">Title</th>
              <th className="w-1/3 ...">Author</th>
              <th className="w-1/3 ...">Views</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Intro to CSS</td>
              <td>Adam</td>
              <td>858</td>
            </tr> */}
            {/* <tr className="bg-blue-200">
              <td>
                A Long and Winding Tour of the History of UI Frameworks and
                Tools and the Impact on Design
              </td>
              <td>Adam</td>
              <td>112</td>
            </tr>
            <tr>
              <td>Intro to JavaScript</td>
              <td>Chris</td>
              <td>1,280</td>
            </tr> */}
          </tbody>
        </table>
        {/* {playlist?.tracks.items.map((item) => (
          <h1>{item.track.name}</h1>
        ))} */}
      </div>
    </div>
  );
};

export default PlaylistPage;
