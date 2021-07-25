import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { IDropDownItem } from "../dropdown/dropdown";

interface IContextMenuProps {
  menuItems?: IDropDownItem[];
  mouseX: number;
  mouseY: number;
  screenX: number;
  screenY: number;
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
  disableInvertX,
  disableInvertY,
  containerRef,
  contextMenuOpen,
  setContextMenuOpen,
}: IContextMenuProps) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenuHeight, setContextMenuHeight] = useState<number>(0);
  const [contextMenuWidth, setContextMenuWidth] = useState<number>(0);
  const [invertContextMenuX, setInvertContextMenuX] = useState<boolean>(false);
  const [invertContextMenuY, setInvertContextMenuY] = useState<boolean>(false);

  const contextMenuItems: IDropDownItem[] = menuItems || [
    {
      title: "Add to queue",
      onClick: () => console.log("add to queue"),
    },
    {
      title: "Start playlist radio",
      onClick: () => console.log("start playlist radio"),
      divider: true,
    },
    {
      title: "Remove from profile",
      onClick: () => console.log("remove from profile"),
      divider: true,
    },
    {
      title: "Remove from Your Library",
      onClick: () => console.log("remove from your library"),
    },
    {
      title: "Create playlist",
      onClick: () => console.log("craete playlist"),
    },
    {
      title: "Create folder",
      onClick: () => console.log("create folder"),
      divider: true,
    },
    {
      title: "Share",
      onClick: () => console.log("share"),
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

  const positionY = () => {
    if (disableInvertY) return mouseY;

    if (invertContextMenuY) return mouseY - contextMenuHeight;

    return mouseY;
  };

  const positionX = () => {
    if (disableInvertX) return mouseX;

    if (invertContextMenuX) return mouseX - contextMenuWidth;

    return mouseX;
  };

  return (
    <div
      ref={contextMenuRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        top: positionY(),
        left: positionX(),
      }}
      className="bg-gray-700 flex flex-col absolute z-40 shadow-lg rounded-md p-1 mx-4"
    >
      {contextMenuItems.map((item) => (
        <Fragment key={item.title}>
          <button
            type="button"
            onClick={item.onClick}
            className="hover:bg-gray-600 py-2 px-4 rounded-sm cursor-pointe text-left text-white w-full h-full"
          >
            {item.title}
          </button>

          {item.divider && <hr className="border-gray-600" />}
        </Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
