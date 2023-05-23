import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import vacancySlice from "./Slices/vacancySlice";
import fyllVacancySlice from "./Slices/fullVacancySlice";
import favoriteVacancySlice from "./Slices/favoriteSlice";
import searchSlice from "./Slices/searchSlice";
import catalogiesSlice from "./Slices/catalogiesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  vacancySlice,
  fyllVacancySlice,
  favoriteVacancySlice,
  searchSlice,
  catalogiesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
