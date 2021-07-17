import { combineReducers } from "redux";
import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  counterReducer,
  loggedReducer,
  session: sessionReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
