import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

export interface INavItemProps {
  icon: IconType;
  title: string;
  route?: string;
}

const NavItem = ({ icon, title, route }: INavItemProps) => {
  const Icon = icon;

  return (
    <NavLink
      to={route || "/"}
      exact
      className="text-gray-400 bg-transparent hover:text-white flex flex-row items-center justify-start rounded-lg  cursor-pointer py-2 px-4 transition duration-150 ease-in-out"
      activeClassName="bg-gray-800 shadow"
      activeStyle={{ color: "white" }} // text-white inside activeClassName doesnt seem to work - probably related to class order with the regular classes overriding the active classes
    >
      <Icon className="text-3xl mr-4 font-normal" />
      <h1 className="font-bold text-sm">{title}</h1>
    </NavLink>
  );
};

export default NavItem;
