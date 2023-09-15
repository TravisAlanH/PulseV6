import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./Slices/Slice";

export const store = configureStore({
  reducer: {
    data: Reducers,
  },
});
