import { useSelector } from "react-redux";
import { RiPlayCircleFill } from "react-icons/ri";
import { RootState } from "../../../redux/reducers";
import Button from "../button/button";
import { authUrl } from "../../../api";

interface IModalProps {
  closeModal: () => void;
}

const Modal = ({ closeModal }: IModalProps) => {
  const { primaryColor } = useSelector((state: RootState) => state.utils);

  return (
    <div className="min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex flex-col justify-center items-center inset-0 z-50 outline-none focus:outline-none">
      <div
        onClick={closeModal}
        className="absolute bg-black opacity-75 inset-0 z-0"
      />
      <div
        style={{
          // The digits or letters after primaryColor indicate opacity in hexidecimal
          backgroundImage: `linear-gradient(${
            primaryColor || "#1F2937"
          }, #1F2937)`,
        }}
        className="h-3/4 md:h-1/2 w-full max-w-xs sm:max-w-sm md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row items-center justify-center relative mx-auto my-auto rounded-lg shadow-lg"
      >
        <div className="h-full w-full md:w-1/2 p-8 md:p-20">
          <div className="h-full w-full bg-blue-700 rounded-lg flex items-center justify-center">
            <RiPlayCircleFill className="text-9xl transform scale-150 text-lime-500" />
          </div>
        </div>
        <div className="h-full w-full md:w-1/2 p-8 md:p-20 pt-0 md:pl-0 flex flex-col items-center justify-evenly text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Start listening with a free Spotify account
          </h1>

          <Button
            title="Sign up free"
            variant="button"
            classes="bg-lime-500 hover:bg-lime-600 text-xs w-full py-4"
          />

          <Button
            title="Download app"
            variant="button"
            classes="bg-white hover:bg-gray-200 text-xs text-gray-900 w-full py-4"
          />

          <div className="flex flex-row items-center justify-center">
            <h3 className="text-xs font-medium">Already have an account?</h3>

            <Button
              title="Log in"
              variant="link"
              href={authUrl}
              classes="text-xs cursor-pointer"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="text-gray-200 hover:text-white text-xs tracking-widest font-medium absolute -bottom-8 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
