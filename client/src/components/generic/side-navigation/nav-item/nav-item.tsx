import { useRef, useState } from "react";
import { IconType } from "react-icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../../redux/reducers";
import { regexPathname } from "../../../../utils";
import Popup from "../../popup/popup";

export interface INavItemProps {
  icon: IconType;
  title: string;
  route?: string;
  iconClasses?: string;
  disableActive?: boolean;
  popup?: { title: string; subtitle: string };
  onClick?: () => void;
}

const NavItem = ({
  icon,
  title,
  route,
  iconClasses,
  disableActive,
  onClick,
  popup,
}: INavItemProps) => {
  const Icon = icon;
  const navLinkRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const { accessToken } = useSelector((state: RootState) => state.session);

  const handleOpenPopup = () => {
    setOpen(true);
  };

  return (
    <>
      <NavLink
        ref={navLinkRef}
        exact
        isActive={(match, location) => {
          if (
            !match?.isExact &&
            route &&
            regexPathname(route) === "collection" &&
            regexPathname(location.pathname) === "collection"
          ) {
            return true;
          }

          return match?.isExact || false;
        }}
        to={route || "/"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={popup && !accessToken ? handleOpenPopup : onClick}
        activeStyle={{ color: !disableActive ? "white" : "" }} // text-white inside activeClassName doesnt seem to work - probably related to class order with the regular classes overriding the active classes
        activeClassName={`${!disableActive && "bg-gray-800 shadow"}`}
        className="text-gray-400 relative bg-transparent hover:text-white flex flex-row items-center justify-start rounded-lg cursor-pointer py-2 px-4 transition duration-200 ease-in-out"
      >
        <Icon
          className={`text-2xl mr-4 font-normal transition duration-200 ease-in-out ${
            iconClasses && iconClasses
          } filter ${hover && "brightness-125"}`}
        />
        <h1 className="font-bold text-sm">{title}</h1>
      </NavLink>

      {open && popup && !accessToken && (
        <Popup
          top={navLinkRef.current?.offsetTop}
          left={navLinkRef.current?.offsetWidth}
          title={popup.title}
          subtitle={popup.subtitle}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default NavItem;
