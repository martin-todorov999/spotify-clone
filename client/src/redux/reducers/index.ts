import { combineReducers } from "redux";
import playbackReducer from "./playback";
import searchReducer from "./search";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
  playback: playbackReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
