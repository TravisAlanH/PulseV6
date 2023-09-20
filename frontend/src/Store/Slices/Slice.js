import { createSlice } from "@reduxjs/toolkit";
import Template, { state } from "./Template";

const initState = state;

const Slice = createSlice({
  name: "Template",
  initialState: initState,
  reducers: {
    changeData: (state, action) => {
      console.log(action.payload);
      state[action.payload.Step][action.payload.Current][action.payload.Key].value = action.payload.value;
    },
    addToStep: (state, action) => {
      state[action.payload.Step] = [...state[action.payload.Step], Template[action.payload.Step]];
    },
    addToRacks: (state, action) => {
      console.log(action.payload);
      let updatedRack = {
        ...Template["Assets"],
        "U Position*": {
          type: "number",
          value: action.payload.UPosition,
          options: [],
          required: false,
          aPIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
        },
      };
      updatedRack = {
        ...updatedRack,
        "Cabinet*": {
          type: "text",
          value: action.payload.Cabinet,
          placeholder: "Input Here",
          options: [],
          required: false,
          APIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
        },
      };
      console.log(updatedRack);
      state["Assets"] = [...state["Assets"], updatedRack];
    },
    addRemoveCustomFields: (state, action) => {
      if (action.payload.checked) {
        for (let i = 0; i < state[action.payload.Step].length; i++) {
          state[action.payload.Step][i][action.payload.keyName] = action.payload.keyValue;
        }
      } else {
        for (let i = 0; i < state[action.payload.Step].length; i++) {
          delete state[action.payload.Step][i][action.payload.keyName];
        }
      }
    },
    updateCurrent: (state, action) => {
      state.Current[action.payload.Step] = action.payload.value;
    },
    loginLogout: (state, action) => {
      state.LoggedIn = action.payload.value;
    },
  },
});

export const {
  addToRacks,
  addObjectToKeyValueToObject,
  addRemoveCustomFields,
  addToStep,
  updateCurrent,
  loginLogout,
  changeData,
} = Slice.actions;
export default Slice.reducer;
