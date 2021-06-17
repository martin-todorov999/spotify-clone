import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "./screens/home-page/home-page";
import SignIn from "./screens/sign-in/sign-in";

const RootRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  );
};

export default RootRoutes;
