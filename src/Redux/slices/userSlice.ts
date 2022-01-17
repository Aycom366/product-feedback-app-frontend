import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitalState } from "../model";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const { data } = await axios.get("/api/user/show-current-user");
    return data;
  } catch (error: any) {
    console.log("Error fetching users", error.response.data.msg);
  }
});

const initialState: InitalState = {
  name: "",
  userId: "",
  pic: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      const { name, userId, pic, email } = action.payload;

      state.name = name;
      state.userId = userId;
      state.pic = pic;
      state.email = email;
    },
    logout: (state) => {
      state.name = "";
      state.userId = "";
      state.pic = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.email = payload?.email;
      state.name = payload?.email;
      state.pic = payload?.pic;
      state.userId = payload?.userId;
    });
  },
});
export const { currentUser, logout } = userSlice.actions;
export default userSlice.reducer;
