import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import NavItem, {
  INavItemProps,
} from "../../generic/side-navigation/nav-item/nav-item";
import Playlists from "../../generic/side-navigation/playlists/playlists";
import SpotifyLogo from "../../generic/side-navigation/spotify-logo/spotify-logo";

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
    <div className="bg-gray-900 flex flex-col px-2 py-4 w-64 h-full hidden md:flex md:flex-col overflow-hidden">
      <SpotifyLogo />

      {navItems.map((item) => (
        <NavItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          route={item.route}
        />
      ))}

      <Playlists />
    </div>
  );
};

export default SideNavigation;
