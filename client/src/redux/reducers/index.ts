import { combineReducers } from "redux";
import searchReducer from "./search";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
