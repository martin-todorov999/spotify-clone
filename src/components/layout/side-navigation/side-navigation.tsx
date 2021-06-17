import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import NavItem, { INavItemProps } from "../../generic/nav-item/nav-item";
import SpotifyLogo from "../../generic/spotify-logo/spotify-logo";

export const navItems: INavItemProps[] = [
  {
    icon: AiOutlineHome,
    title: "Home",
    route: "/",
  },
  {
    icon: BiSearch,
    title: "Search",
    route: "/search",
  },
  {
    icon: VscLibrary,
    title: "Your Library",
    route: "/collection/playlists",
  },
];

const SideNavigation = () => {
  return (
    <div className="bg-gray-900 px-2 py-4 w-64">
      <SpotifyLogo />

      {navItems.map((item) => (
        <NavItem icon={item.icon} title={item.title} route={item.route} />
      ))}
    </div>
  );
};

export default SideNavigation;
