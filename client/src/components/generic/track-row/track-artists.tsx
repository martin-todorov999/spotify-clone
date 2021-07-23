import { MdExplicit } from "react-icons/md";

interface ITrackArists {
  track: SpotifyApi.TrackObjectFull;
}

const TrackArtists = ({ track }: ITrackArists) => {
  return (
    <div className="text-gray-400 flex flex-row items-center">
      {track.explicit && <MdExplicit className="mr-1" />}

      <h3 className="text-sm font-normal tracking-wide line-clamp-1">
        {track.artists.map((artist) => artist.name).join(", ")}
      </h3>
    </div>
  );
};

export default TrackArtists;
