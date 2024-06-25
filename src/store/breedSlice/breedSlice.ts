import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DogBreed } from "@/../types/breed/index";
import breedsData from "@/utils/breed-data/data.json";

interface BreedsState {
  breeds: DogBreed[];
}

const initialState: BreedsState = {
  breeds: breedsData.breeds,
};

export const breedsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {},
});

export const {} = breedsSlice.actions;

export const selectBreeds = (state: RootState) => state.breeds.breeds;

export default breedsSlice.reducer;
