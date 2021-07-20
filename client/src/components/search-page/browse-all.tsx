import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api";
import { RootState } from "../../redux/reducers";
import CategoryCard from "../generic/category-card/category-card";
import ContentSection from "../generic/content-section/content-section";

const BrowseAll = () => {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.session
  );
  const [categories, setCategories] =
    useState<SpotifyApi.MultipleCategoriesResponse>();

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);

      spotifyApi
        .getCategories({ limit: 50, country: user?.country, locale: "en" })
        .then(({ body }) => {
          setCategories(body);
        });
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <div>
      {accessToken && categories && (
        <ContentSection title="Browse All">
          {categories.categories.items.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ContentSection>
      )}
    </div>
  );
};

export default BrowseAll;
