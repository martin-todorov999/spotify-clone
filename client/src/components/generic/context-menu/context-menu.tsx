import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { IDropDownItem } from "../dropdown/dropdown";

interface IContextMenuProps {
  mouseX: number;
  mouseY: number;
  screenY: number;
  containerRef: RefObject<HTMLDivElement>;
  contextMenuOpen: boolean;
  setContextMenuOpen: (open: boolean) => void;
}

const ContextMenu = ({
  mouseX,
  mouseY,
  screenY,
  containerRef,
  contextMenuOpen,
  setContextMenuOpen,
}: IContextMenuProps) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenuHeight, setContextMenuHeight] = useState<number>(0);
  const [invertContextMenu, setInvertContextMenu] = useState<boolean>(false);

  const menuItems: IDropDownItem[] = [
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
        setInvertContextMenu(
          contextMenuRef.current.clientHeight + screenY >=
            containerRef.current.parentElement.clientHeight
        );
      }
    }
    // eslint-disable-next-line
  }, [contextMenuOpen]);

  return (
    <div
      ref={contextMenuRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        top: invertContextMenu ? mouseY - contextMenuHeight : mouseY,
        left: mouseX,
      }}
      className="bg-gray-700 flex flex-col absolute z-40 shadow-lg rounded-md p-1 mx-4"
    >
      {menuItems.map((item) => (
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
