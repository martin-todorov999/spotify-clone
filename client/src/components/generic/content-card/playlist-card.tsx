import { useDispatch } from "react-redux";
import useSortImages from "../../../hooks/utils/useSortImages";
import { setTrackUri } from "../../../redux/actions/playback";
import { clearQuery } from "../../../redux/actions/search";
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

  // return (
  //   <div
  //     onClick={handlePlayTrack}
  //     className="bg-gray-700 rounded-lg p-4 min-w-32 min-h-32 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer flex flex-col"
  //   >
  //     {/* <div
  //       style={{ paddingBottom: "100%" }}
  //       className={`bg-gray-500 ${roundedVariant} w-full relative mb-4`}
  //     > */}
  //     {/* <img
  //       alt="media"
  //       src={images[Math.round((images.length - 1) / 2) || 0].url}
  //       className="h-full w-full object-contain"
  //     /> */}
  //     {/* </div> */}
  //     {/* <h1 className="text-white">{item.name}</h1> */}
  //     <h3 className="text-gray-400">
  //       {/* {item.artists.map((artist) => artist.name).join(", ")} */}
  //     </h3>
  //   </div>
  // );
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
