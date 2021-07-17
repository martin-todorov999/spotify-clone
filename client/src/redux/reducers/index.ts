import { combineReducers } from "redux";
import counterReducer from "./counter";
import loggedReducer from "./isLogged";

const rootReducer = combineReducers({
  counterReducer,
  loggedReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
