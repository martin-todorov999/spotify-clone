import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useSortImages from "../../../hooks/utils/useSortImages";
import ContentCard from "./content-card";

interface IPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCard = ({ playlist }: IPlaylistCardProps) => {
  const history = useHistory();
  const images = useSortImages(playlist.images);
  const imageUrl = images[Math.round((images.length - 1) / 2) || 0].url;

  const handlePlayPlaylist = () => {
    history.push(`/playlist/${playlist.id}`);
  };

  return (
    <ContentCard
      title={playlist.name}
      subtitle={
        playlist.description || playlist.owner.display_name || playlist.type
      }
      url={imageUrl}
      roundedVariant="rounded-3xl"
      onClick={handlePlayPlaylist}
    />
  );
};

export default PlaylistCard;
