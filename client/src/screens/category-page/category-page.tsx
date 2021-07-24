import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { usePalette } from "react-palette";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/generic/loader/loader";
import { RootState } from "../../redux/reducers";
import CategoryInfo from "../../components/category-page/category-info";
import ContentSection from "../../components/generic/content-section/content-section";
import ContentCard from "../../components/generic/content-card/content-card";
import handleRedirectClick from "../../utils";

const CategoryPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.session
  );
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<SpotifyApi.CategoryObject>();
  const [playlists, setPlaylists] =
    useState<SpotifyApi.CategoryPlaylistsReponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const { data } = usePalette(category?.icons[0].url || "");

  useEffect(() => {
    if (data.darkVibrant) {
      setPrimaryColor(data.darkVibrant);
      dispatch({ type: "SET_PRIMARY_COLOR", payload: data.darkVibrant });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:6969/categories/${id}`)
        .then(({ data: { body } }) => {
          setCategory(body);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`http://localhost:6969/categories/${id}/playlists`)
        .then(({ data: { body } }) => {
          setPlaylists(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (category && playlists) setIsLoading(false);
  }, [category, playlists]);

  return (
    <>
      {isLoading || !playlists || !category ? (
        <Loader />
      ) : (
        <>
          <div className="bg-gray-700 flex flex-col h-full">
            <div
              style={{ background: primaryColor }}
              className="flex flex-row items-center justify-start h-72 p-8 pt-24"
            >
              <CategoryInfo title={category.name} primaryColor={primaryColor} />
            </div>

            <div
              style={{
                // The digits or letters after primaryColor indicate opacity in hexidecimal
                backgroundImage: `linear-gradient(${primaryColor}99, #1F2937 50%)`,
              }}
              className="bg-gray-800 flex flex-col flex-grow p-8"
            >
              <ContentSection title="Popular playlists">
                {playlists.playlists.items.map((playlist) => (
                  <ContentCard
                    key={playlist.id}
                    title={playlist.name}
                    subtitle={playlist.description || ""}
                    url={playlist.images[0].url}
                    roundedVariant="rounded"
                    onClick={() =>
                      handleRedirectClick(playlist.id, "playlist", history)
                    }
                  />
                ))}
              </ContentSection>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryPage;
