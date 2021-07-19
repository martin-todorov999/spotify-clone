import BrowseAll from "./browse-all";

interface INoSearchResultsProps {
  query: string;
}

const NoSearchResults = ({ query }: INoSearchResultsProps) => {
  return (
    <>
      {query ? (
        <div className="text-center">
          <h1 className="text-white font-medium text-2xl mb-2">{`No results found for "${query}"`}</h1>
          <h2 className="text-white">
            Please make sure your words are spelled correctly or use less or
            different keywords.
          </h2>
        </div>
      ) : (
        <BrowseAll />
      )}
    </>
  );
};

export default NoSearchResults;
