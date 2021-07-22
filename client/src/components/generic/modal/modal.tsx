import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import Button from "../button/button";

const Modal = () => {
  const { primaryColor } = useSelector((state: RootState) => state.utils);

  return (
    <div className="min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
      <div className="absolute bg-black opacity-75 inset-0 z-0" />
      <div
        style={{
          // The digits or letters after primaryColor indicate opacity in hexidecimal
          backgroundImage: `linear-gradient(${primaryColor}, #1F2937)`,
        }}
        className="h-3/4 md:h-1/2 w-full max-w-xs sm:max-w-sm md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row items-center justify-center relative mx-auto my-auto rounded-lg shadow-lg"
      >
        <div className="h-full w-full md:w-1/2 p-8 md:p-20">
          <div className="h-full w-full bg-lime-400 rounded-lg">asd</div>
        </div>
        <div className="h-full w-full md:w-1/2 p-8 md:p-20 pt-0 md:pl-0 flex flex-col items-center justify-evenly text-white text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Start listening with a free Spotify account
          </h1>

          <Button
            title="Sign up free"
            variant="button"
            classes="bg-lime-500 hover:bg-lime-600 text-xs w-full h-12 uppercase"
          />

          <Button
            title="Download app"
            variant="button"
            classes="bg-white hover:bg-gray-200 text-xs text-black w-full h-12 uppercase"
          />

          <div className="flex flex-row items-center justify-center">
            <h3 className="text-xs font-medium">Already have an account?</h3>

            <Button
              title="Log in"
              variant="link"
              href="https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-library-read%20user-library-modify%20user-top-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public"
              classes="text-xs uppercase cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
