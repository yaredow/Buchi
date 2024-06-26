import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./testSlice/testSlice";
import { breedsSlice } from "./breedSlice/breedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      test: counterSlice.reducer,
      breeds: breedsSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
