import { Fragment } from "react";
import useContrastText from "../../hooks/utils/useContrastText";
import useEstimateTime from "../../hooks/utils/useEstimateTime";
import { parseDuration } from "./playlist-track-row";

interface IPlaylistInfoProps {
  type: string;
  name: string;
  description?: string | null;
  ownerName?: string;
  artists?: SpotifyApi.ArtistObjectSimplified[];
  followers?: number;
  year?: string;
  tracksCount: number;
  trackDuration?: number;
  primaryColor: string;
}

const PlaylistInfo = ({
  type,
  name,
  description,
  ownerName,
  artists,
  followers,
  year,
  tracksCount,
  trackDuration,
  primaryColor,
}: IPlaylistInfoProps) => {
  const estimatedTime = useEstimateTime(tracksCount);
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";
  const textSecondary = useContrastText(primaryColor)
    ? "text-gray-800"
    : "text-gray-300";
  const formattedLikes = followers
    ? followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : undefined;

  return (
    <div className="h-full w-full pt-8 flex flex-col justify-end">
      <h6 className={`uppercase text-xs font-bold ${textPrimary}`}>{type}</h6>

      <h1
        className={`uppercase text-6xl xl:text-8xl font-black tracking-tight my-4 ${textPrimary}`}
      >
        {name}
      </h1>

      {description && (
        <h3 className={`text-sm font-normal mb-2 ${textSecondary}`}>
          {description}
        </h3>
      )}

      <div className="flex flex-row items-center">
        {artists
          ? artists.map((artist, index, array) => (
              <Fragment key={artist.id}>
                <h3 className={`text-sm font-bold mr-2 ${textPrimary}`}>
                  {artist.name}
                </h3>

                {array.length - 1 !== index && (
                  <h3 className={`text-sm font-bold mr-2 ${textPrimary}`}>
                    &bull;
                  </h3>
                )}
              </Fragment>
            ))
          : ownerName && (
              <h3 className={`text-sm font-bold mr-2 ${textPrimary}`}>
                {ownerName}
              </h3>
            )}

        <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>&bull;</h3>

        {formattedLikes && (
          <>
            <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
              {`${formattedLikes} ${formattedLikes > "1" ? "likes" : "like"}`}
            </h3>
            <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>
              &bull;
            </h3>
          </>
        )}

        {year && (
          <>
            <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
              {year}
            </h3>
            <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>
              &bull;
            </h3>
          </>
        )}

        <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
          {`${tracksCount} ${tracksCount !== 1 ? "songs" : "song"},`}
        </h3>

        <h3 className={`text-sm font-normal ${textSecondary}`}>
          {trackDuration
            ? parseDuration(trackDuration, true)
            : `about ${estimatedTime} hr`}
        </h3>
      </div>
    </div>
  );
};

export default PlaylistInfo;
