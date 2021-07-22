import { useEffect, useRef } from "react";
import Button from "../button/button";

interface IPopupProps {
  top?: number;
  left?: number;
  title: string;
  subtitle: string;
  setOpen: (open: boolean) => void;
}

const Popup = ({ top, left, title, subtitle, setOpen }: IPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [popupRef]);

  return (
    <div
      ref={popupRef}
      style={{
        top,
        left,
      }}
      className="bg-blue-500 absolute h-32 w-80 z-40 rounded-lg p-4 text-white flex flex-col justify-between shadow-lg"
    >
      <div
        style={{
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          borderRight: "10px solid #3B82F6",
        }}
        className="h-0 w-0 absolute left-0 -ml-2"
      />

      <div>
        <h1 className="font-bold">{title}</h1>

        <h3 className="text-sm">{subtitle}</h3>
      </div>

      <div className="flex flex-row justify-end">
        <Button
          title="Not now"
          variant="button"
          classes="text-xs"
          onClick={() => setOpen(false)}
        />

        <Button
          title="Log in"
          variant="link"
          classes="bg-lime-500 hover:bg-lime-600 text-xs"
          href="https://accounts.spotify.com/authorize?client_id=d1b6a57fb43949f5b15ff1f50e47e764&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-library-read%20user-library-modify%20user-top-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public"
        />
      </div>
    </div>
  );
};

export default Popup;
