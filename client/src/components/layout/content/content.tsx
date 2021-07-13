import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Content = ({ children }: IProps) => {
  return (
    <div className="container flex-grow mx-auto py-4 px-8">
      <>{children}</>
    </div>
  );
};

export default Content;
