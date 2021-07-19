import { ReactNode } from "react";
import Player from "../../generic/player/player";
import Content from "../content/content";
import SideNavigation from "../side-navigation/side-navigation";

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return (
    <div className="bg-gray-800 flex flex-row h-screen">
      <SideNavigation />
      <Content>{children}</Content>
      <Player />
    </div>
  );
};

export default Container;
