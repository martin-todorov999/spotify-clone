import { Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import HomePage from "./screens/home-page/home-page";
import SearchPage from "./screens/search-page/search-page";

const RootRoutes = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  console.log(accessToken);

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
