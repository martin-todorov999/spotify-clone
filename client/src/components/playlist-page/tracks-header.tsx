import { AiOutlineClockCircle } from "react-icons/ai";

interface ITracksHeaderProps {
  simplified?: boolean;
}

const TracksHeader = ({ simplified }: ITracksHeaderProps) => {
  const titleAndIndex = (
    <>
      <div className="w-16 flex flex-row items-center justify-center">
        <h3 className="text-lg font-normal uppercase">#</h3>
      </div>

      <div className="w-6/12 flex flex-row items-center justify-start">
        <h3 className="text-xs font-normal tracking-widest uppercase">Title</h3>
      </div>
    </>
  );

  return (
    <>
      <div
        className={`flex flex-row text-gray-400 ${
          simplified && "justify-between"
        }`}
      >
        {simplified ? (
          <div className="relative flex items-center justify-center mr-4">
            {titleAndIndex}
          </div>
        ) : (
          titleAndIndex
        )}

        {!simplified && (
          <div className="w-4/12 flex flex-row items-center justify-start">
            <h3 className="text-xs font-normal tracking-widest uppercase">
              Album
            </h3>
          </div>
        )}

        {!simplified && (
          <div className="w-2/12 flex flex-row items-center justify-start">
            <h3 className="text-xs font-normal tracking-widest uppercase">
              Date added
            </h3>
          </div>
        )}

        <div className="w-32 flex flex-row items-center justify-center">
          <AiOutlineClockCircle className="text-lg font-normal tracking-widest uppercase" />
        </div>
      </div>

      <hr className="border-gray-600 mt-2 mb-4" />
    </>
  );
};

export default TracksHeader;
