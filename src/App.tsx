import "./App.css";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import RootRoutes from "./root-routes";
import Container from "./components/layout/container/container";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Container>
        <RootRoutes />
      </Container>
    </Router>
  );
};

export default App;
