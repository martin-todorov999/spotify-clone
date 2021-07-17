import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import { logIn } from "./redux/actions/session";
import HomePage from "./screens/home-page/home-page";
import SearchPage from "./screens/search-page/search-page";

const RootRoutes = () => {
  const dispatch = useDispatch();
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  useEffect(() => {
    if (accessToken) {
      dispatch(logIn(accessToken));
    }
  }, [accessToken, dispatch]);

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
