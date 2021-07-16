import { RiSpotifyLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SpotifyLogo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row items-center justify-center text-white text-3xl font-bold mb-4">
        <RiSpotifyLine className="mr-2 text-5xl" />
        <h1 className="text-center">Spotify</h1>
      </div>
    </Link>
  );
};

export default SpotifyLogo;
