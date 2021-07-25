import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import { RootState } from "./redux/reducers";
import AlbumPage from "./screens/album-page/album-page";
import CategoryPage from "./screens/category-page/category-page";
import HomePage from "./screens/home-page/home-page";
import LibraryPage from "./screens/library-page/library-page";
import PlaylistPage from "./screens/playlist-page/playlist-page";
import ProfilePage from "./screens/profile-page/profile-page";
import SearchPage from "./screens/search-page/search-page";

const RootRoutes = () => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const code = new URLSearchParams(window.location.search).get("code");
  useAuth(code);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />

        <Route exact path="/playlist/:id" component={PlaylistPage} />
        <Route exact path="/category/:id" component={CategoryPage} />
        <Route exact path="/album/:id" component={AlbumPage} />

        {accessToken && (
          <>
            <Route
              exact
              path="/collection/:type(playlists|podcasts|artists|albums)"
              component={LibraryPage}
            />
            <Route exact path="/user/:id" component={ProfilePage} />
          </>
        )}

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default RootRoutes;
