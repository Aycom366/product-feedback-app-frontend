import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WidthState {
  width: number;
}

const initialState: WidthState = {
  width: window.innerWidth,
};

export const widthSlice = createSlice({
  name: "width",
  initialState,
  reducers: {
    currentWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});

export const { currentWidth } = widthSlice.actions;
export default widthSlice.reducer;
