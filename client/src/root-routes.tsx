import { Redirect, Route, Switch } from "react-router";
import useAuth from "./hooks/useAuth";
import HomePage from "./screens/home-page/home-page";
import SignIn from "./screens/sign-in/sign-in";

const RootRoutes = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  console.log(accessToken);

  return (
    <>
      {code ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Redirect exact path="/signin" to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      )}
    </>
  );
};

export default RootRoutes;
