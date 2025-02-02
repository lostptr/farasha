import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "@store/library";
import { rememberEnhancer, rememberReducer } from "redux-remember";

const reducers = {
  library: libraryReducer,
};
const rememberedReducers: (keyof typeof reducers)[] = ["library"];

export const store = configureStore({
  reducer: rememberReducer(reducers),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedReducers),
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
