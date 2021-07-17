import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

export interface IDropDownItem {
  title: string;
  onClick: () => void;
}

interface IDropDownProps {
  title: string;
  avatar?: string;
  items: IDropDownItem[];
}

const DropDown = ({ title, avatar, items }: IDropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={handleClick}
        className={`${
          open ? "bg-gray-700" : "bg-gray-900"
        } hover:bg-gray-700 rounded-full h-8 py-2 pr-4 text-white text-sm font-medium flex flex-row items-center cursor-pointer`}
      >
        {avatar && (
          <img
            alt="avatar"
            src={avatar}
            className="object-cover object-center w-8 h-8 visible rounded-full mr-2 border-4 border-transparent"
          />
        )}

        <h1 className="mr-2">{title}</h1>

        {open ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
      </div>

      {open && items.length && (
        <div className="absolute bg-gray-700 p-1 mt-2 w-full rounded-md shadow-lg flex flex-col">
          {items.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={item.onClick}
              className="hover:bg-gray-600 py-2 px-4 rounded-md cursor-pointe text-left w-full h-full"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
