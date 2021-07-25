import { createStore } from "redux";
import { applyMiddleware, compose } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";
import handleRefreshToken from "./middleware";
import { rehydrationComplete } from "./actions/session";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  whitelist: ["session", "playback"],
  storage,
};

const persistantReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistantReducer,
  compose(applyMiddleware(handleRefreshToken), composeEnhancers())
);
const persistor = persistStore(store, {}, () => {
  store.dispatch(rehydrationComplete());
});

export { persistor, store };
