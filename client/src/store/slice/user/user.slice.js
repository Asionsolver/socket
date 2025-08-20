import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: () => {
      console.log("User logged in");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, () => {
      console.log("pending...");
    });
    builder.addCase(loginUserThunk.fulfilled, () => {
      console.log("fulfilled");
    });

    builder.addCase(loginUserThunk.rejected, () => {
      console.error("rejected");
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
