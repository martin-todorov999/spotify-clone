import { useDispatch } from "react-redux";
import useSortImages from "../../../hooks/utils/useSortImages";
import ContentCard from "./content-card";

interface IPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistCard = ({ playlist }: IPlaylistCardProps) => {
  const dispatch = useDispatch();
  const images = useSortImages(playlist.images);
  const imageUrl = images[Math.round((images.length - 1) / 2) || 0].url;

  const handlePlayPlaylist = () => {
    console.log(playlist.name);
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
