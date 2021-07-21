import { RiPlayCircleFill } from "react-icons/ri";

const InteractionRow = () => {
  const handlePlay = () => {
    console.log("play");
  };

  return (
    <div className="py-8">
      <RiPlayCircleFill
        onClick={handlePlay}
        className="text-6xl text-lime-500 rounded-full cursor-pointer"
      />
    </div>
  );
};

export default InteractionRow;
