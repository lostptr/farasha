import { createSlice } from "@reduxjs/toolkit";
import { CharacterSheet } from "@types";

type SheetState = CharacterSheet;

const initialState: SheetState = {
  key: "",
  name: "",
  playerName: "",
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {},
});

// export const {} = sheetSlice.actions;
export default sheetSlice.reducer;
