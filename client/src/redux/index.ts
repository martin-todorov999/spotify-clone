import { applyMiddleware, createStore } from "redux";
import { compose } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  blacklist: [],
  storage,
};

const persistantReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistantReducer, composeEnhancers());
const persistor = persistStore(store);

export { persistor, store };
