import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterSheet } from "@types";

interface LibraryState {
  sheets: CharacterSheet[];
}

const initialState: LibraryState = {
  sheets: [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addSheet: (state, action: PayloadAction<CharacterSheet>) => {
      state.sheets = [...state.sheets, action.payload];
    },
    removeSheet: (state, action: PayloadAction<{ key: string }>) => {
      state.sheets = state.sheets.filter((c) => c.key !== action.payload.key);
    },
  },
});

export const { addSheet, removeSheet } = librarySlice.actions;
export default librarySlice.reducer;
