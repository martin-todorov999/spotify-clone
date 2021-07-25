import { RefObject, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ContextMenu from "../context-menu/context-menu";
import { IDropDownItem } from "../dropdown/dropdown";

interface IContextButtonProps {
  menuItems: IDropDownItem[];
  containerRef: RefObject<HTMLDivElement>;
}

const ContextButton = ({ menuItems, containerRef }: IContextButtonProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [screenX, setScreenX] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: any) => {
    event.preventDefault();

    setMouseX(
      (buttonRef.current?.offsetLeft &&
        buttonRef.current?.clientWidth &&
        buttonRef.current?.offsetLeft - buttonRef.current?.clientWidth) ||
        event.clientX
    );
    setMouseY(
      (buttonRef.current?.offsetTop &&
        buttonRef.current?.clientHeight &&
        buttonRef.current?.offsetTop + buttonRef.current?.clientHeight) ||
        event.clientY
    );
    setScreenX(event.screenX);
    setScreenY(event.screenY);
    setContextMenuOpen(true);
  };

  return (
    <>
      <div ref={buttonRef}>
        <HiOutlineDotsHorizontal
          onClick={handleContextMenu}
          className="text-4xl text-gray-400 hover:text-white rounded-full cursor-pointer"
        />
      </div>

      {contextMenuOpen && (
        <ContextMenu
          menuItems={menuItems}
          mouseX={mouseX}
          mouseY={mouseY}
          screenX={screenX}
          screenY={screenY}
          containerRef={containerRef}
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}
    </>
  );
};

export default ContextButton;
