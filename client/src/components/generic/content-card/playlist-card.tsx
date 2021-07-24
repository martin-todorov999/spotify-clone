import { useHistory } from "react-router";
import { useAverageSizeImage } from "../../../hooks/utils/useSortImages";
import ContentCard from "./content-card";

interface IPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  size?: "small" | "large";
}

const PlaylistCard = ({ playlist, size }: IPlaylistCardProps) => {
  const history = useHistory();
  const image = useAverageSizeImage(playlist.images);

  const handlePlayPlaylist = () => {
    history.push(`/playlist/${playlist.id}`);
  };

  return (
    <ContentCard
      title={playlist.name}
      subtitle={playlist.description || `By ${playlist.owner.display_name}`}
      url={image.url}
      size={size}
      roundedVariant="rounded"
      onClick={handlePlayPlaylist}
    />
  );
};

export default PlaylistCard;
