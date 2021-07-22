interface ITrackRowProps {
  number: JSX.Element;
  title: JSX.Element;
  album: JSX.Element;
  dateAdded: JSX.Element;
  time: JSX.Element;
}

const TrackRow = ({
  number,
  title,
  album,
  dateAdded,
  time,
}: ITrackRowProps) => {
  return (
    <div className="flex flex-row text-gray-400">
      <div className="w-16 flex flex-row items-center justify-center">
        {number}
      </div>
      <div className="w-6/12 flex flex-row items-center justify-start">
        {title}
      </div>
      <div className="w-4/12 flex flex-row items-center justify-start">
        {album}
      </div>
      <div className="w-2/12 flex flex-row items-center justify-start">
        {dateAdded}
      </div>
      <div className="w-32 flex flex-row items-center justify-center">
        {time}
      </div>
    </div>
  );
};

export default TrackRow;
