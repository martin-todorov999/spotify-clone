import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";
import Button from "../../generic/button/button";
import IconButton from "../../generic/icon-button/icon-button";
import SearchField from "../../generic/search-field/search-field";

interface INavBarProps {
  isScrolled: boolean;
}

const NavBar = ({ isScrolled }: INavBarProps) => {
  const history = useHistory();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  useEffect(() => {
    setShowSearchBar(location.pathname === "/search");
  }, [location]);

  const handleBack = () => {
    history.goBack();
  };

  const handleForward = () => {
    history.goForward();
  };

  return (
    <div
      className={`${
        isScrolled ? "bg-transparent" : "bg-gray-900"
      } top-0 sticky h-12 p-8 shadow-lg flex items-center justify-between transition duration-500 ease-out`}
    >
      <div className="flex flex-row items-center">
        <IconButton
          classes={`${
            isScrolled ? "bg-gray-700" : "bg-gray-800"
          } mr-4 transition duration-500 ease-out`}
          onClick={handleBack}
        >
          <FaChevronLeft />
        </IconButton>

        <IconButton
          classes={`${
            isScrolled ? "bg-gray-700" : "bg-gray-800"
          } transition duration-500 ease-out`}
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
        <Button
          title="Sign Up"
          variant="link"
          classes="hover:bg-gray-700 text-white mr-4"
          href="https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
        />
        <Button
          title="Log In"
          variant="link"
          classes="bg-lime-600 hover:bg-lime-700 text-white"
          href="https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
        />
      </div>
    </div>
  );
};

export default NavBar;
