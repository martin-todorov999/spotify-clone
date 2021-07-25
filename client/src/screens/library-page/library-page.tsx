import { useParams } from "react-router";
import AlbumsLibrary from "../../components/library-page/albums-library";
import ArtistsLibrary from "../../components/library-page/artists-library";
import PlaylistsLibrary from "../../components/library-page/playlists-library";
import PodcastsLibrary from "../../components/library-page/podcasts-library";

const LibraryPage = () => {
  const { type } = useParams<{ type: string }>();

  const renderLibraryResponse = () => {
    switch (type) {
      case "playlists":
        return <PlaylistsLibrary />;
      case "podcasts":
        return <PodcastsLibrary />;
      case "artists":
        return <ArtistsLibrary />;
      case "albums":
        return <AlbumsLibrary />;
      default:
        return null;
    }
  };

  return renderLibraryResponse();
};

export default LibraryPage;
