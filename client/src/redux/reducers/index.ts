import { combineReducers } from "redux";
import playbackReducer from "./playback";
import searchReducer from "./search";
import sessionReducer from "./session";
import utilsReducer from "./utils";

const rootReducer = combineReducers({
  session: sessionReducer,
  search: searchReducer,
  playback: playbackReducer,
  utils: utilsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
