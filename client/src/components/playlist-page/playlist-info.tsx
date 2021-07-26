import { ReactNode } from "react";
import useContrastText from "../../hooks/utils/useContrastText";

interface IInfoHeaderProps {
  type: string;
  name: string;
  description?: string | null;
  primaryColor: string;
  detailsInfo?: ReactNode;
}

const InfoHeader = ({
  type,
  name,
  description,
  primaryColor,
  detailsInfo,
}: IInfoHeaderProps) => {
  const textPrimary = useContrastText(primaryColor)
    ? "text-gray-900"
    : "text-white";
  const textSecondary = useContrastText(primaryColor)
    ? "text-gray-800"
    : "text-gray-300";

  return (
    <div className="h-full w-full pt-8 flex flex-col justify-end">
      <h6 className={`uppercase text-xs font-bold ${textPrimary}`}>{type}</h6>

      <h1
        className={`text-6xl xl:text-8xl font-black tracking-tight my-4 ${textPrimary}`}
      >
        {name}
      </h1>

      {description && (
        <h3 className={`text-sm font-normal mb-2 ${textSecondary}`}>
          {description}
        </h3>
      )}

      <div className="flex flex-row items-center">{detailsInfo}</div>
    </div>
  );
};

export default InfoHeader;
