import { ReactNode } from "react";

interface IIconButtonProps {
  classes?: string;
  children: ReactNode;
  onClick: () => void;
}

const IconButton = ({ classes, children, onClick }: IIconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 w-8 h-8 rounded-full bg-gray-700 ${classes && classes}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
