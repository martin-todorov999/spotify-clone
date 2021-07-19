import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import HomePage from "./screens/home-page/home-page";
import SearchPage from "./screens/search-page/search-page";

const RootRoutes = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  useAuth(code);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </>
  );
};

export default RootRoutes;
