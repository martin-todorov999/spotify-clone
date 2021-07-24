import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { authUrl } from "../../../api";
import { logOut } from "../../../redux/actions/session";
import { RootState } from "../../../redux/reducers";
import { regexPathname } from "../../../utils";
import Button from "../../generic/button/button";
import DropDown from "../../generic/dropdown/dropdown";
import IconButton from "../../generic/icon-button/icon-button";
import SearchField from "../../generic/search-field/search-field";
import LibraryMenu from "../../library-page/library-menu";

interface INavBarProps {
  isScrolled: boolean;
  isPlaylistPage: boolean;
}

const NavBar = ({ isScrolled, isPlaylistPage }: INavBarProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showLibraryMenu, setShowLibraryMenu] = useState<boolean>(false);
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const { primaryColor } = useSelector((state: RootState) => state.utils);

  const handleLogOut = () => {
    dispatch(logOut());
    window.location.href = "/";
  };

  const dropdownItems = [
    {
      title: "Profile",
      onClick: () => {
        history.push("/user/USERNAME");
      },
    },
    {
      title: "Log Out",
      onClick: handleLogOut,
    },
  ];

  useEffect(() => {
    setShowSearchBar(regexPathname(location.pathname) === "search");
    setShowLibraryMenu(regexPathname(location.pathname) === "collection");
  }, [location]);

  const handleBack = () => {
    history.goBack();
  };

  const handleForward = () => {
    history.goForward();
  };

  const navbarClasses = () => {
    let classes = "";

    if (isPlaylistPage) {
      classes = `absolute bg-black bg-opacity-25 ${
        isScrolled ? "bg-gray-800 shadow-lg" : "shadow-none"
      }`;
    } else {
      classes = `${isScrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"}`;
    }

    return classes;
  };

  return (
    <div
      style={{ background: isScrolled && isPlaylistPage ? primaryColor : "" }}
      className={`${navbarClasses()} top-0 h-min md:h-12 w-full p-4 md:p-8 flex flex-col md:flex-row items-center justify-between transition duration-500 ease-out z-40`}
    >
      <div className="flex flex-row items-center mb-4 md:mb-0">
        <IconButton
          classes="bg-gray-900 text-white mr-4 transition duration-500 ease-out hidden md:block"
          onClick={handleBack}
        >
          <FaChevronLeft />
        </IconButton>

        <IconButton
          classes="bg-gray-900 text-white transition duration-500 ease-out hidden md:block"
          onClick={handleForward}
        >
          <FaChevronRight />
        </IconButton>

        {showLibraryMenu && <LibraryMenu />}

        {showSearchBar && (
          <SearchField
            autoFocus
            wrapperClasses="md:ml-4"
            placeholder="Artists, songs, or podcasts."
          />
        )}
      </div>

      <div>
        {!accessToken ? (
          <Button
            title="Log In"
            variant="link"
            classes="bg-white hover:bg-gray-300 text-gray-900 text-sm"
            href={authUrl}
          />
        ) : (
          <DropDown
            title={user?.display_name}
            avatar={user?.images && user?.images[0].url}
            items={dropdownItems}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
