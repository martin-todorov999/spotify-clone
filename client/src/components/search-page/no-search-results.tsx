import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import BrowseAll from "./browse-all";
import TopGenres from "./top-genres";

interface INoSearchResultsProps {
  query: string;
}

const NoSearchResults = ({ query }: INoSearchResultsProps) => {
  const { accessToken } = useSelector((state: RootState) => state.session);

  return (
    <>
      {query ? (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          <h1 className="text-white font-medium text-2xl mb-2">{`No results found for "${query}"`}</h1>
          <h2 className="text-white">
            Please make sure your words are spelled correctly or use less or
            different keywords.
          </h2>
        </div>
      ) : (
        <>
          {accessToken && <TopGenres />}
          <BrowseAll />
        </>
      )}
    </>
  );
};

export default NoSearchResults;
