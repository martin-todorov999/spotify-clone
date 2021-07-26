import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { IDropDownItem } from "../dropdown/dropdown";

interface IContextMenuProps {
  menuItems?: IDropDownItem[];
  mouseX: number;
  mouseY: number;
  screenX: number;
  screenY: number;
  positionX?: "left" | "right";
  positionY?: "top" | "bottom";
  disableInvertX?: boolean;
  disableInvertY?: boolean;
  containerRef: RefObject<HTMLDivElement>;
  contextMenuOpen: boolean;
  setContextMenuOpen: (open: boolean) => void;
}

const ContextMenu = ({
  menuItems,
  mouseX,
  mouseY,
  screenX,
  screenY,
  positionX,
  positionY,
  disableInvertX,
  disableInvertY,
  containerRef,
  contextMenuOpen,
  setContextMenuOpen,
}: IContextMenuProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenuHeight, setContextMenuHeight] = useState<number>(0);
  const [contextMenuWidth, setContextMenuWidth] = useState<number>(0);
  const [invertContextMenuX, setInvertContextMenuX] = useState<boolean>(false);
  const [invertContextMenuY, setInvertContextMenuY] = useState<boolean>(false);

  const contextMenuItems: IDropDownItem[] = menuItems || [
    {
      title: "Add to queue",
      onClick: () => null,
    },
    {
      title: "Start playlist radio",
      onClick: () => null,
      divider: true,
    },
    {
      title: "Remove from profile",
      onClick: () => null,
      divider: true,
    },
    {
      title: "Remove from Your Library",
      onClick: () => null,
    },
    {
      title: "Create playlist",
      onClick: () => null,
    },
    {
      title: "Create folder",
      onClick: () => null,
      divider: true,
    },
    {
      title: "Share",
      onClick: () => null,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setContextMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [contextMenuRef]);

  useEffect(() => {
    if (contextMenuOpen) {
      if (
        contextMenuRef.current &&
        containerRef.current &&
        containerRef.current.parentElement
      ) {
        setContextMenuHeight(contextMenuRef.current.clientHeight);
        setInvertContextMenuY(
          contextMenuRef.current.clientHeight + screenY >=
            containerRef.current.parentElement.clientHeight
        );

        setContextMenuWidth(contextMenuRef.current.clientWidth);
        setInvertContextMenuX(
          contextMenuRef.current.clientWidth + screenX >=
            containerRef.current.parentElement.clientWidth
        );
      }
    }
    // eslint-disable-next-line
  }, [contextMenuOpen]);

  const handleY = () => {
    if (disableInvertY) return mouseY;

    if (invertContextMenuY) return mouseY - contextMenuHeight;

    return mouseY;
  };

  const handleX = () => {
    if (disableInvertX) return mouseX;

    if (invertContextMenuX) return mouseX - contextMenuWidth;

    return mouseX;
  };

  const renderMenuItem = (item: IDropDownItem) => (
    <>
      <button
        type="button"
        onClick={item.onClick}
        onMouseEnter={() => setHover(!!item.hoverElement || !!item.isNested)}
        className="hover:bg-gray-600 py-2 px-4 rounded-sm cursor-pointer text-left text-white w-full h-full flex flex-row items-center justify-between"
      >
        {item.title}
        {item.hoverElement && <AiFillCaretDown />}
      </button>

      {item.divider && <hr className="border-gray-600" />}
    </>
  );

  return (
    <div
      ref={contextMenuRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        [positionX || "left"]: handleX(),
        [positionY || "top"]: handleY(),
      }}
      className="bg-gray-700 flex flex-col absolute z-40 shadow-lg rounded-md p-1 mx-4"
    >
      {contextMenuItems.map((item) => (
        <Fragment key={item.title}>
          {renderMenuItem(item)}

          {item.hoverElement &&
            hover &&
            item.hoverElement.map((hoverItem) => (
              <Fragment key={hoverItem.title}>
                {renderMenuItem(hoverItem)}
              </Fragment>
            ))}
        </Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
