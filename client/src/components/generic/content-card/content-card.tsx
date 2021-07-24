import { useState } from "react";
import { RiPlayCircleFill } from "react-icons/ri";

interface IContentCardProps {
  title: string;
  subtitle?: string;
  url?: string;
  size?: "small" | "large";
  roundedVariant: "rounded" | "rounded-3xl" | "rounded-full";
  onClick: () => void;
  handlePlay?: () => void;
}

const ContentCard = ({
  title,
  subtitle,
  url,
  size,
  roundedVariant,
  onClick,
  handlePlay,
}: IContentCardProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`h-min ${
        size === "large" ? "w-60" : "w-44"
      } p-4 hover:bg-gradient-to-tl from-gray-700 to-gray-800 flex flex-col rounded-lg shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer`}
    >
      <div className="relative mb-4">
        <img
          alt="media"
          src={
            url ||
            "https://cdn.iconscout.com/icon/free/png-256/account-1439373-1214443.png"
          }
          className={`${
            size === "large" ? "w-52 h-52" : "w-36 h-36"
          } bg-gray-400 object-cover ${roundedVariant}`}
        />
        {hover && handlePlay && (
          <RiPlayCircleFill
            onClick={handlePlay}
            className="absolute right-0 bottom-0 mr-2 mb-2 text-5xl text-lime-500 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 ease-in-out"
          />
        )}
      </div>

      <div className="flex flex-col line-clamp-2">
        <h1 className="text-white font-bold text-md line-clamp-1">{title}</h1>
        {subtitle && (
          <h3 className="text-gray-400 font-normal text-sm capitalize line-clamp-2">
            {subtitle}
          </h3>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
