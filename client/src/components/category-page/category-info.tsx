import useContrastText from "../../hooks/utils/useContrastText";

interface ICategoryInfoProps {
  title: string;
  primaryColor: string;
}

const CategoryInfo = ({ title, primaryColor }: ICategoryInfoProps) => {
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";

  return (
    <div className="h-full w-full pt-8 flex flex-col justify-end">
      <h1
        className={`uppercase text-6xl xl:text-8xl font-black tracking-tight my-4 ${textPrimary}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default CategoryInfo;
