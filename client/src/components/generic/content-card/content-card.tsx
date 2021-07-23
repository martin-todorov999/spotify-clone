interface IContentCardProps {
  title: string;
  subtitle?: string;
  url?: string;
  size?: "small" | "large";
  roundedVariant: "rounded" | "rounded-3xl" | "rounded-full";
  onClick: () => void;
}

const ContentCard = ({
  title,
  subtitle,
  url,
  size,
  roundedVariant,
  onClick,
}: IContentCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`h-full ${
        size === "large" ? "w-60" : "w-44"
      } p-4 hover:bg-gradient-to-tl from-gray-700 to-gray-800 flex flex-col rounded-lg shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer`}
    >
      <img
        alt="media"
        src={
          url ||
          "https://cdn.iconscout.com/icon/free/png-256/account-1439373-1214443.png"
        }
        className={`${
          size === "large" ? "w-52 h-52" : "w-36 h-36"
        } mb-4 bg-gray-400 object-cover ${roundedVariant}`}
      />
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
