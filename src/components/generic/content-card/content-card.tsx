interface IContentCardProps {
  title: string;
  subtitle: string;
}

const ContentCard = ({ title, subtitle }: IContentCardProps) => {
  return (
    <div className="bg-gray-700 hover:bg-gray-600 h-52 w-52 rounded-lg p-4 shadow-md hover:shadow-xl transition duration-150 ease-in-out cursor-pointer">
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
};

export default ContentCard;
