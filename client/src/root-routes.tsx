import { Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import HomePage from "./screens/home-page/home-page";

const RootRoutes = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  console.log(accessToken);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default RootRoutes;
