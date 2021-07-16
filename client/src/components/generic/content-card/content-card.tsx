interface IContentCardProps {
  title: string;
  subtitle: string;
}

const ContentCard = ({ title, subtitle }: IContentCardProps) => {
  return (
    <div className="bg-gray-700 h-64 w-56 rounded-lg p-4 shadow-md hover:shadow-xl transition duration-200 ease-in-out cursor-pointer flex flex-col">
      <div className="bg-gray-500 rounded-sm h-48 w-48 mb-2">a</div>
      <h1 className="text-white">{title}</h1>
      <h3 className="text-gray-400">{subtitle}</h3>
    </div>
  );
};

export default ContentCard;
