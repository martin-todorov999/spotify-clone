import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

interface ITrackRowProps {
  track: SpotifyApi.PlaylistTrackObject;
  index: number;
}

const TrackRow = ({ track, index }: ITrackRowProps) => {
  const timeAgo = new TimeAgo("en-US");

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
    <div className="flex flex-row text-gray-400 hover:bg-gray-700 py-2 rounded-md">
      <div className="w-16 flex flex-row items-center justify-center">
        <h3 className="text-lg font-normal uppercase">{index + 1}</h3>
      </div>
      <div className="w-6/12 flex flex-row items-center justify-start pr-2">
        <img
          alt="album art"
          src={getSmallestImage(track.track.album.images).url}
          className="h-10 w-10 rounded-sm mr-4"
        />
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white text-xs font-medium tracking-widest uppercase mb-1 line-clamp-1">
            {track.track.name}
          </h3>

          <h3 className="text-xs font-normal tracking-widest uppercase line-clamp-1">
            {track.track.artists.map((artist) => artist.name).join(", ")}
          </h3>
        </div>
      </div>
      <div className="w-4/12 flex flex-row items-center justify-start pr-2">
        <h3 className="text-xs font-normal tracking-widest uppercase line-clamp-1">
          {track.track.album.name}
        </h3>
      </div>
      <div className="w-2/12 flex flex-row items-center justify-start">
        <h3 className="text-xs font-normal tracking-widest uppercase">
          {timeAgo.format(new Date(track.added_at))}
        </h3>
      </div>
      <div className="w-32 flex flex-row items-center justify-center">
        {parseDuration(track.track.duration_ms)}
      </div>
    </div>
  );
};

export default TrackRow;
