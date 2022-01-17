import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISettings {
  name: string;
  sort: string;
  modalContent: string;
}

const initialState: ISettings = {
  name: "All",
  sort: "Most Upvotes",
  modalContent: "Login",
};

export const SettingsSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    currentCategory: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    currentSorting: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    currentModalContent: (state, action: PayloadAction<string>) => {
      state.modalContent = action.payload;
    },
  },
});

export const { currentCategory,currentModalContent, currentSorting } = SettingsSlice.actions;
export default SettingsSlice.reducer;
