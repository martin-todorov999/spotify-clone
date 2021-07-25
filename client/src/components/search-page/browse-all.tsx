import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import CategoryCard from "../generic/category-card/category-card";
import ContentSection from "../generic/content-section/content-section";
import Loader from "../generic/loader/loader";

const BrowseAll = () => {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [categories, setCategories] =
    useState<SpotifyApi.MultipleCategoriesResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi
        .getCategories({ limit: 50, country: user?.country, locale: "en" })
        .then(({ body }) => {
          setCategories(body);
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .get("http://localhost:6969/categories")
        .then(({ data: { body } }) => {
          setCategories(body);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        categories && (
          <ContentSection title="Browse All">
            {categories.categories.items.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ContentSection>
        )
      )}
    </>
  );
};

export default BrowseAll;
