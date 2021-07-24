import "./App.css";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import RootRoutes from "./root-routes";
import Container from "./components/layout/container/container";
import Loader from "./components/generic/loader/loader";

const history = createBrowserHistory();

const App = () => {
  const { rehydrated } = useSelector((state: RootState) => state.session);

  return (
    <Router history={history}>
      {!rehydrated ? (
        <Loader />
      ) : (
        <Container>
          <RootRoutes />
        </Container>
      )}
    </Router>
  );
};

export default App;
