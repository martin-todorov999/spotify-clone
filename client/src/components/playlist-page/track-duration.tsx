import { RefObject } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import ContextButton from "../generic/context-button/context-button";
import { IDropDownItem } from "../generic/dropdown/dropdown";

interface ITrackDurationProps {
  duration: string;
  hover: boolean;
  isLiked: boolean;
  showLikedOnHover?: boolean;
  handleLikeSong: () => void;
  contextMenuItems: IDropDownItem[];
  containerRef: RefObject<HTMLDivElement>;
}

const TrackDuration = ({
  duration,
  hover,
  isLiked,
  showLikedOnHover,
  handleLikeSong,
  contextMenuItems,
  containerRef,
}: ITrackDurationProps) => {
  return (
    <div className="w-32 flex flex-row items-center justify-evenly">
      {isLiked ? (
        <HiHeart
          onClick={handleLikeSong}
          className={`text-lime-500 text-lg cursor-pointer ${
            showLikedOnHover && !hover && "invisible"
          }`}
        />
      ) : (
        <HiOutlineHeart
          onClick={handleLikeSong}
          className={`text-gray-400 text-lg cursor-pointer ${
            !hover && "invisible"
          }`}
        />
      )}
      {duration}
      <ContextButton
        iconClasses={`text-lg ${!hover && "invisible"}`}
        menuItems={contextMenuItems}
        containerRef={containerRef}
      />
    </div>
  );
};

export default TrackDuration;
