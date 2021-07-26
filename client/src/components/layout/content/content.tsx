import _ from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../redux/reducers";
import { regexPathname } from "../../../utils";
import NavBar from "../navbar/navbar";

interface IProps {
  children: ReactNode;
}

const Content = ({ children }: IProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrolledFlag, setIsScrolledFlag] = useState<boolean>(false);
  const [isFullscreenPage, setIsFulscreenPage] = useState<boolean>(false);
  const { accessToken } = useSelector((state: RootState) => state.session);

  const location = useLocation();

  useEffect(() => {
    setIsFulscreenPage(
      regexPathname(location.pathname) === "playlist" ||
        regexPathname(location.pathname) === "category" ||
        regexPathname(location.pathname) === "album" ||
        regexPathname(location.pathname) === "user"
    );
    // eslint-disable-next-line
  }, [location]);

  const debounceIsScrolled = _.debounce((val) => {
    setIsScrolled(val);
  }, 100);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const scrollHasChanged = event.currentTarget.scrollTop >= 48 * 2;
    // height of the NavBar times two. Couldn't find a clean way to retrieve the NavBar height automagically

    if (scrollHasChanged !== isScrolledFlag) {
      setIsScrolledFlag(scrollHasChanged);
      debounceIsScrolled(scrollHasChanged);
    }
  };

  return (
    <div className="w-full flex flex-col flex-grow relative overflow-y-auto">
      <NavBar isScrolled={isScrolled} isPlaylistPage={isFullscreenPage} />

      <div
        onScroll={handleScroll}
        className={`${
          !isFullscreenPage ? "py-4 px-8" : "w-full"
        } flex flex-col items-center md:block flex-grow overflow-y-auto overflow-x-hidden ${
          accessToken ? "mb-20" : ""
        }`}
      >
        <>{children}</>
      </div>
    </div>
  );
};

export default Content;
