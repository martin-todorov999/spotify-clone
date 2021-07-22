import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../redux/reducers";
import Modal from "../../generic/modal/modal";
import NavItem, {
  INavItemProps,
} from "../../generic/side-navigation/nav-item/nav-item";
import Playlists from "../../generic/side-navigation/playlists/playlists";
import SpotifyLogo from "../../generic/side-navigation/spotify-logo/spotify-logo";

const SideNavigation = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accessToken } = useSelector((state: RootState) => state.session);
  const { pathname } = useLocation();

  const handleNavItemClick = () => {
    if (!accessToken) setOpenModal(true);
  };

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
      disableActive: true,
      onClick: handleNavItemClick,
    },
  ];

  return (
    <div className="bg-gray-900 flex flex-col px-2 py-4 w-64 h-full hidden md:flex md:flex-col overflow-hidden">
      <SpotifyLogo />

      {navItems.map((item) => (
        <NavItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          route={item.route}
          disableActive={item.disableActive}
          onClick={item.onClick}
        />
      ))}

      <Playlists handleModal={handleNavItemClick} />

      {openModal && <Modal closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default SideNavigation;
