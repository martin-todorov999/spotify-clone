import _ from "lodash";
import { ReactNode, useState } from "react";
import NavBar from "../navbar/navbar";

interface IProps {
  children: ReactNode;
}

const Content = ({ children }: IProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  let isScrolledFlag = false;

  const debounceIsScrolled = _.debounce((val) => {
    setIsScrolled(val);
  }, 100);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const scrollHasChanged = event.currentTarget.scrollTop >= 48 * 2;
    // height of the NavBar times two. Couldn't find a clean way to retrieve the NavBar height automagically

    if (scrollHasChanged !== isScrolledFlag) {
      isScrolledFlag = scrollHasChanged;
      debounceIsScrolled(scrollHasChanged);
    }
  };

  return (
    <div className="flex flex-col flex-grow relative overflow-y-auto">
      <NavBar isScrolled={isScrolled} />

      <div
        onScroll={handleScroll}
        className="container flex flex-col items-center md:block flex-grow mx-auto py-4 px-8 overflow-y-auto"
      >
        <>{children}</>
      </div>
    </div>
  );
};

export default Content;
