import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  const [primaryColor, setPrimaryColor] = useState<string>("");

  useEffect(() => {
    setIsFeatured(playlist?.owner.id === "spotify");
  }, [playlist?.owner.id]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6969/playlist/${id}`)
        .then(({ data: { body } }) => {
          console.log(body);
          setPrimaryColor(body.primary_color);
          setPlaylist(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div className="bg-gray-700 flex flex-col h-full">
      <div style={{ background: primaryColor }} className="h-96 p-8">
        <img
          alt="playlist cover"
          src={playlist?.images[0].url}
          // style={{
          //   backgroundImage: `linear-gradient(${primaryColor}, rgba(0, 0, 0, 0))`,
          // }}
          className="h-full shadow-2xl"
        />
        {/* <h1>{playlist?.name}</h1> */}
      </div>
      <div className="bg-gray-800">
        {playlist?.tracks.items.map((item) => (
          <h1>{item.track.name}</h1>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
