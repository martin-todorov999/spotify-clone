import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { logOut } from "../../../redux/actions/session";
import { RootState } from "../../../redux/reducers";
import Button from "../../generic/button/button";
import DropDown from "../../generic/dropdown/dropdown";
import IconButton from "../../generic/icon-button/icon-button";
import SearchField from "../../generic/search-field/search-field";

interface INavBarProps {
  isScrolled: boolean;
  isPlaylistPage: boolean;
}

const NavBar = ({ isScrolled, isPlaylistPage }: INavBarProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
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
    setShowSearchBar(location.pathname === "/search");
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
      classes = `absolute ${
        isScrolled ? "bg-gray-800 shadow-lg" : "shadow-none"
      }`;
    } else {
      classes = `shadow-lg ${isScrolled ? "bg-gray-800" : "bg-gray-900"}`;
    }

    return classes;
  };

  return (
    <div
      style={{ background: isScrolled && isPlaylistPage ? primaryColor : "" }}
      className={`${navbarClasses()} top-0 h-12 w-full p-8 flex items-center justify-between transition duration-500 ease-out z-50`}
    >
      <div className="flex flex-row items-center">
        <IconButton
          classes={`${
            isScrolled ? "bg-gray-700" : "bg-gray-800"
          } text-white mr-4 transition duration-500 ease-out`}
          onClick={handleBack}
        >
          <FaChevronLeft />
        </IconButton>

        <IconButton
          classes={`${
            isScrolled ? "bg-gray-700" : "bg-gray-800"
          } text-white transition duration-500 ease-out`}
          onClick={handleForward}
        >
          <FaChevronRight />
        </IconButton>

        {showSearchBar && (
          <SearchField
            autoFocus
            wrapperClasses="ml-4"
            placeholder="Artists, songs, or podcasts."
          />
        )}
      </div>

      <div>
        {!accessToken ? (
          <Button
            title="Log In"
            variant="link"
            classes="bg-lime-600 hover:bg-lime-700 text-white"
            href="https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-library-read%20user-library-modify%20user-top-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public"
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
