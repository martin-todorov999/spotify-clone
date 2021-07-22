import { useSelector } from "react-redux";
import useContrastText from "../../hooks/utils/useContrastText";
import useEstimateTime from "../../hooks/utils/useEstimateTime";
import { RootState } from "../../redux/reducers";

interface IPlaylistInfoProps {
  playlist: SpotifyApi.PlaylistObjectFull;
  primaryColor: string;
}

const PlaylistInfo = ({ playlist, primaryColor }: IPlaylistInfoProps) => {
  const estimatedTime = useEstimateTime(playlist?.tracks.total);
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";
  const textSecondary = useContrastText(primaryColor)
    ? "text-gray-800"
    : "text-gray-300";

  return (
    <div className="h-full w-full pt-8 flex flex-col justify-end">
      <h6 className={`uppercase text-xs font-bold ${textPrimary}`}>
        {playlist?.type}
      </h6>

      <h1
        className={`uppercase text-6xl xl:text-8xl font-black tracking-tight my-4 ${textPrimary}`}
      >
        {playlist?.name}
      </h1>

      <h3 className={`text-sm font-normal mb-2 ${textSecondary}`}>
        {playlist?.description}
      </h3>

      <div className="flex flex-row items-center">
        <h3 className={`text-sm font-bold mr-2 ${textPrimary}`}>
          {playlist?.owner.display_name}
        </h3>

        <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>&bull;</h3>

        <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
          {playlist?.followers.total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {" likes"}
        </h3>

        <h3 className={`text-sm font-bold mr-2 ${textSecondary}`}>&bull;</h3>

        <h3 className={`text-sm font-normal mr-2 ${textSecondary}`}>
          {playlist?.tracks.total}
          {" songs,"}
        </h3>

        <h3 className={`text-sm font-normal ${textSecondary}`}>
          {"about "}
          {estimatedTime}
          {" hr"}
        </h3>
      </div>
    </div>
  );
};

export default PlaylistInfo;
