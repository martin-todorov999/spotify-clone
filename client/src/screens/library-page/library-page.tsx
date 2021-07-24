import { useParams } from "react-router";
import ContentSection from "../../components/generic/content-section/content-section";
import AlbumsLibrary from "../../components/library-page/albums-library";
import ArtistsLibrary from "../../components/library-page/artists-library";
import PlaylistsLibrary from "../../components/library-page/playlists-library";
import PodcastsLibrary from "../../components/library-page/podcasts-library";

const LibraryPage = () => {
  const { type } = useParams<{ type: string }>();

  const renderLibraryResponse = () => {
    switch (type) {
      case "podcasts":
        return <PodcastsLibrary />;
      case "artists":
        return <ArtistsLibrary />;
      case "albums":
        return <AlbumsLibrary />;
      default:
        return <PlaylistsLibrary />;
    }
  };

  return renderLibraryResponse();
};

export default LibraryPage;
