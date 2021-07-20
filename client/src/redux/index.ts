import { createStore } from "redux";
import { applyMiddleware, compose } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import handleRefreshToken from "./middleware";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  whitelist: ["session", "playback"],
  storage,
};

const persistantReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistantReducer,
  compose(applyMiddleware(ReduxThunk, handleRefreshToken), composeEnhancers())
);
const persistor = persistStore(store);

export { persistor, store };
