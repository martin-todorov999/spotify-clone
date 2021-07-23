import _ from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import NavBar from "../navbar/navbar";

interface IProps {
  children: ReactNode;
}

const Content = ({ children }: IProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrolledFlag, setIsScrolledFlag] = useState<boolean>(false);
  const [isFullscreenPage, setIsFulscreenPage] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setIsFulscreenPage(
      location.pathname.replace(/^\/([^/]*).*$/, "$1") === "playlist" ||
        location.pathname.replace(/^\/([^/]*).*$/, "$1") === "category"
    );
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
    <div className="flex flex-col flex-grow relative overflow-y-auto">
      <NavBar isScrolled={isScrolled} isPlaylistPage={isFullscreenPage} />

      <div
        onScroll={handleScroll}
        className={`${
          !isFullscreenPage ? "py-4 px-8 container" : "w-full"
        } flex flex-col items-center md:block flex-grow mx-auto  overflow-y-auto`}
      >
        <>{children}</>
      </div>
    </div>
  );
};

export default Content;
