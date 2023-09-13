import { createSlice } from "@reduxjs/toolkit";
import Template, { state } from "./Template";

const initState = state;

const Slice = createSlice({
  name: "Template",
  initialState: initState,
  reducers: {
    changeData: (state, action) => {
      state.test = state.test + action.payload;
    },
    loginLogout: (state, action) => {
      state.LoggedIn = action.payload.value;
    },
  },
});

export const { loginLogout, changeData } = Slice.actions;
export default Slice.reducer;
