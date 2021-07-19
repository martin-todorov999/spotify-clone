import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../../redux/actions/search";
import { RootState } from "../../../redux/reducers";

interface ISearchFieldProps {
  wrapperClasses?: string;
  placeholder: string;
  autoFocus?: boolean;
}

export interface ISearchResult {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

const SearchField = ({
  wrapperClasses,
  placeholder,
  autoFocus,
}: ISearchFieldProps) => {
  const dispatch = useDispatch();
  const inputField = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { query } = useSelector((state: RootState) => state.search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    dispatch(setQuery(inputValue));
  }, [inputValue, dispatch]);

  useEffect(() => {
    if (!query) setInputValue("");
  }, [query]);

  useEffect(() => {
    if (autoFocus && inputField.current) {
      inputField.current.focus();
    }
  }, [autoFocus]);

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
