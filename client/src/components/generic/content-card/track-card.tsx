import { useDispatch } from "react-redux";
import { useAverageSizeImage } from "../../../hooks/utils/useSortImages";
import { setUri } from "../../../redux/actions/playback";
import ContentCard from "./content-card";

interface ITrackCardProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackCard = ({ track }: ITrackCardProps) => {
  const dispatch = useDispatch();
  const image = useAverageSizeImage(track.album.images);

  const handlePlayTrack = () => {
    dispatch(setUri(track.uri));
  };

  return (
    <ContentCard
      title={track.name}
      subtitle={track.artists.map((artist) => artist.name).join(", ")}
      url={image.url}
      roundedVariant="rounded"
      onClick={handlePlayTrack}
    />
  );
};

export default TrackCard;
