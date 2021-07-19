interface ICategoryCardProps {
  category: SpotifyApi.CategoryObject;
}

const CategoryCard = ({ category }: ICategoryCardProps) => {
  return (
    <div className="hover:bg-gray-700 hover:shadow-xl rounded-lg p-4 min-w-32 min-h-32 transition duration-200 ease-in-out cursor-pointer flex flex-col break-words">
      <h1 className="text-white text-2xl font-semibold mb-4">
        {category.name}
      </h1>
      <img
        alt="media"
        src={category.icons[0].url}
        className="h-full w-full rounded-md shadow-md hover:shadow-none"
      />
    </div>
  );
};

export default CategoryCard;
