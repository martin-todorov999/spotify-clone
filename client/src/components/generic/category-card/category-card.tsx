import { useHistory } from "react-router";
import useSortImages from "../../../hooks/utils/useSortImages";
import { handleRedirectClick } from "../../../utils";

interface ICategoryCardProps {
  category: SpotifyApi.CategoryObject;
}

const CategoryCard = ({ category }: ICategoryCardProps) => {
  const history = useHistory();
  const smallestImage = useSortImages(category.icons)[0];

  return (
    <div
      onClick={() => handleRedirectClick(category.id, "category", history)}
      className="hover:bg-gradient-to-tl from-gray-700 to-gray-800 hover:shadow-xl h-min w-min rounded-lg p-4 transition duration-200 ease-in-out cursor-pointer flex flex-col break-words"
    >
      <h1 className="text-white text-2xl font-semibold mb-4 line-clamp-1">
        {category.name}
      </h1>
      <img
        alt="media"
        src={smallestImage.url}
        className="min-w-32 min-h-32 max-h-52 max-w-52 rounded-md shadow-md hover:shadow-none"
      />
    </div>
  );
};

export default CategoryCard;
