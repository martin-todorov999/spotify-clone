import { useHistory } from "react-router";
import { useAverageSizeImage } from "../../../hooks/utils/useSortImages";
import ContentCard from "./content-card";

interface IPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCard = ({ playlist }: IPlaylistCardProps) => {
  const history = useHistory();
  const image = useAverageSizeImage(playlist.images);

  const handlePlayPlaylist = () => {
    history.push(`/playlist/${playlist.id}`);
  };

  return (
    <ContentCard
      title={playlist.name}
      subtitle={
        playlist.description || playlist.owner.display_name || playlist.type
      }
      url={image.url}
      roundedVariant="rounded-3xl"
      onClick={handlePlayPlaylist}
    />
  );
};

export default PlaylistCard;
