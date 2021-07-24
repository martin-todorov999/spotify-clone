import { useDispatch } from "react-redux";
import { setUri } from "../../../redux/actions/playback";
import { getAverageSizeImage } from "../../../utils/images";
import ContentCard from "./content-card";

interface ITrackCardProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackCard = ({ track }: ITrackCardProps) => {
  const dispatch = useDispatch();
  const image = getAverageSizeImage(track.album.images);

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
