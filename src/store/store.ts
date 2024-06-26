import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./testSlice/testSlice";
import { breedsSlice } from "./breedSlice/breedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      test: counterSlice.reducer,
      breeds: breedsSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
