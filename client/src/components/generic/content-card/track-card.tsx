import { useDispatch } from "react-redux";
import useSortImages from "../../../hooks/utils/useSortImages";
import { setUri } from "../../../redux/actions/playback";
import ContentCard from "./content-card";

interface ITrackCardProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackCard = ({ track }: ITrackCardProps) => {
  const dispatch = useDispatch();
  const images = useSortImages(track.album.images);
  const imageUrl = images[Math.round((images.length - 1) / 2) || 0].url;

  const handlePlayTrack = () => {
    dispatch(setUri(track.uri));
  };

  return (
    <ContentCard
      title={track.name}
      subtitle={track.artists.map((artist) => artist.name).join(", ")}
      url={imageUrl}
      roundedVariant="rounded"
      onClick={handlePlayTrack}
    />
  );
};

export default TrackCard;
