import { RefObject, useState } from "react";
import { RiVolumeUpLine, RiPauseLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../../redux/reducers";
import spotifyApi from "../../../../api";
import ContextMenu from "../../context-menu/context-menu";

interface IPlaylistRowProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  containerRef: RefObject<HTMLDivElement>;
}

const PlaylistRow = ({
  playlist,
  isPlaying,
  setIsPlaying,
  containerRef,
}: IPlaylistRowProps) => {
  const history = useHistory();
  const { uri } = useSelector((state: RootState) => state.playback);
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);

  const handlePause = () => {
    if (isPlaying) spotifyApi.pause().finally(() => setIsPlaying(false));
  };

  const handlePlay = () => {
    if (!isPlaying) spotifyApi.play().finally(() => setIsPlaying(true));
  };

  // MouseEvent and MouseEventHandler<HTMLDivElement> both didn't seem to work so any was used as a last resort
  const handleContextMenu = (event: any) => {
    event.preventDefault();

    setMouseX(event.clientX);
    setMouseY(event.clientY);
    setScreenY(event.screenY);
    setContextMenuOpen(true);
  };

  const handlePlaylistRedirect = () => {
    history.push(`/playlist/${playlist.id}`);
  };

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        className="flex flex-row justify-between items-center text-gray-400 hover:text-white"
      >
        {/* eslint-disable-next-line */}
        <h3
          onClick={handlePlaylistRedirect}
          className="text-sm line-clamp-1 mb-3 mr-2"
        >
          {playlist.name}
        </h3>
        {playlist.uri === uri &&
          (isPlaying ? (
            <RiVolumeUpLine
              onClick={handlePause}
              className="text-gray-400 hover:text-white cursor-pointer text-lg mr-2"
            />
          ) : (
            <RiPauseLine
              onClick={handlePlay}
              className="text-gray-400 hover:text-white cursor-pointer text-lg mr-2"
            />
          ))}
      </div>

      {contextMenuOpen && (
        <ContextMenu
          mouseX={mouseX}
          mouseY={mouseY}
          screenY={screenY}
          containerRef={containerRef}
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}
    </>
  );
};

export default PlaylistRow;
