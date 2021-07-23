interface IContentCardProps {
  title: string;
  subtitle: string;
  url: string;
  roundedVariant: "rounded" | "rounded-3xl" | "rounded-full";
  onClick: () => void;
}

const ContentCard = ({
  title,
  subtitle,
  url,
  roundedVariant,
  onClick,
}: IContentCardProps) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-gradient-to-tl from-gray-700 to-gray-800 flex flex-col rounded-lg h-full w-full p-4 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
    >
      <img
        alt="media"
        src={url}
        className={`min-w-24 min-h-24 mb-4 object-contain ${roundedVariant}`}
      />
      <div className="flex flex-col line-clamp-2">
        <h1 className="text-white font-semibold text-lg">{title}</h1>
        <h3 className="text-gray-400 font-normal text-md">{subtitle}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
