import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userState: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { userState } = authSlice.actions;

export default authSlice.reducer;
