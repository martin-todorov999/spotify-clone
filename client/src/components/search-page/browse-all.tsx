import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import ContentSection from "../generic/content-section/content-section";

const BrowseAll = () => {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      {accessToken && <ContentSection title="Your top genres" />}
      <h1>BROWSE AL</h1>
    </div>
  );
};

export default BrowseAll;
