import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../redux/reducers";
import NavItem, {
  INavItemProps,
} from "../../generic/side-navigation/nav-item/nav-item";
import Playlists from "../../generic/side-navigation/playlists/playlists";
import SpotifyLogo from "../../generic/side-navigation/spotify-logo/spotify-logo";

const SideNavigation = () => {
  const { pathname } = useLocation();
  const { accessToken } = useSelector((state: RootState) => state.session);

  const navItems: INavItemProps[] = [
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
      route: accessToken ? "/collection/playlists" : pathname,
      disableActive: !accessToken,
      popup: {
        title: "Your Library",
        subtitle: "Log in to view your library.",
      },
    },
  ];

  return (
    <div className="bg-gray-900 flex flex-col px-2 py-4 w-64 min-w-64 h-full hidden md:flex md:flex-col overflow-hidden">
      <SpotifyLogo />

      {navItems.map((item) => (
        <NavItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          route={item.route}
          disableActive={item.disableActive}
          popup={item.popup}
          onClick={item.onClick}
        />
      ))}

      <Playlists />
    </div>
  );
};

export default SideNavigation;
