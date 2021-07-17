import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import _ from "lodash";
import SpotifyWebApi from "spotify-web-api-node";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

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
  const [searchResults, setSearchResults] = useState([]);
  const { accessToken } = useSelector((state: RootState) => state.session);

  const spotifyApi = useMemo(
    () =>
      new SpotifyWebApi({
        clientId: "d1b6a57fb43949f5b15ff1f50e47e764",
      }),
    []
  );

  useEffect(() => {
    if (autoFocus && inputField.current) {
      inputField.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
  }, [accessToken, spotifyApi]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = _.debounce((query: string) => {
    spotifyApi.searchTracks(query).then((res) => {
      console.log(res);
    });
  }, 500);

  useEffect(() => {
    if (accessToken && inputValue) {
      handleSearch(inputValue);
    }
  }, [inputValue, accessToken, handleSearch]);

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
