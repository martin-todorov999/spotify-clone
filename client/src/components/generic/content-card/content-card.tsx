interface IContentCardProps {
  title: string;
  subtitle: string;
  url: string;
  roundedVariant: "rounded-sm" | "rounded-3xl" | "rounded-full";
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
      className="bg-gray-700 flex flex-col rounded-lg h-full w-full p-4 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
    >
      <img
        alt="media"
        src={url}
        className={`min-w-32 min-h-32 mb-4 object-contain ${roundedVariant}`}
      />
      <div className="flex flex-col line-clamp-2">
        <h1 className="text-white font-semibold text-lg">{title}</h1>
        <h3 className="text-gray-400 font-normal text-md">{subtitle}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
