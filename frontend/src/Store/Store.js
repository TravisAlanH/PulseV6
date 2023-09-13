import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./Slices/Slice"; // Adjust the path accordingly

export const store = configureStore({
  reducer: {
    data: Reducers,
  },
});
