import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import _ from "lodash";
import SpotifyWebApi from "spotify-web-api-node";

interface ISearchFieldProps {
  wrapperClasses?: string;
  placeholder: string;
  autoFocus?: boolean;
}

const SearchField = ({
  wrapperClasses,
  placeholder,
  autoFocus,
}: ISearchFieldProps) => {
  const inputField = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  // const accessToken = "";
  // const spotifyApi = new SpotifyWebApi({
  //   clientId: "d1b6a57fb43949f5b15ff1f50e47e764",
  // });

  // useEffect(() => {

  // }, [accessToken])

  useEffect(() => {
    if (autoFocus && inputField.current) {
      inputField.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = _.debounce(() => {}, 500);

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <form method="GET">
      <div
        className={`cursor-text relative text-gray-600 ${
          wrapperClasses && wrapperClasses
        }`}
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-2xl">
          <BiSearch />
        </span>
        <input
          ref={inputField}
          name="search"
          type="search"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          className="py-2 text-sm text-black font-medium bg-white rounded-full pl-10 pr-10 focus:outline-none"
        />
        {inputValue && (
          <button type="button" onClick={handleClearInput}>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-2xl">
              <VscChromeClose />
            </span>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchField;
