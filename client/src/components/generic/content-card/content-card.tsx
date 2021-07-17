interface IContentCardProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  variant?: "default" | "podcast" | "artist";
}

const ContentCard = ({
  title,
  subtitle,
  imageUrl,
  variant,
}: IContentCardProps) => {
  let roundedVariant = "rounded-sm";

  if (variant === "podcast") roundedVariant = "rounded-3xl";
  if (variant === "artist") roundedVariant = "rounded-full";

  return (
    <div className="bg-gray-700 rounded-lg p-4 min-w-32 min-h-32 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer flex flex-col">
      <div
        style={{ paddingBottom: "100%" }}
        className={`bg-gray-500 ${roundedVariant} w-full relative mb-4`}
      >
        {/* <img
          alt="media"
          src={imageUrl}
          className="h-full w-full object-contain"
        /> */}
      </div>
      <h1 className="text-white">{title}</h1>
      <h3 className="text-gray-400">{subtitle}</h3>
    </div>
  );
};

export default ContentCard;

ContentCard.defaultProps = {
  variant: "default",
};
