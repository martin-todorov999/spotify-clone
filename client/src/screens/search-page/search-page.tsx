import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/actions";
import ContentSection from "../../components/generic/content-section/content-section";
import { RootState } from "../../redux/reducers";

const SearchPage = () => {
  const counter = useSelector((state: RootState) => state.counterReducer);
  const isLogged = useSelector((state: RootState) => state.loggedReducer);
  const dispatch = useDispatch();

  console.log(counter);
  console.log(isLogged);

  const handleClick = () => {
    dispatch(increment(5));
  };

  return (
    <>
      <button onClick={handleClick} type="button">
        CLICk
      </button>
      <ContentSection title="Your top genres" />
    </>
  );
};

export default SearchPage;
