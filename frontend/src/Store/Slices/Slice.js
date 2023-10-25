import { createSlice } from "@reduxjs/toolkit";
import Template, * as TemplateState from "./Template";

// const initState = state;
console.log(JSON.parse(localStorage.getItem("PulseStateData")));

if (localStorage.getItem("PulseStateData") === null) {
  localStorage.setItem("PulseStateData", JSON.stringify(TemplateState.state));
}

let initState = JSON.parse(localStorage.getItem("PulseStateData"));

const Slice = createSlice({
  name: "Template",
  initialState: initState,
  reducers: {
    changeData: (state, action) => {
      console.log(action.payload);
      state[action.payload.Step][action.payload.Current][action.payload.Key].value = action.payload.value;
      if (action.payload.Step === "Location" && action.payload.Key === "dcTrack Location Code *") {
        Object.keys(state).forEach((key) => {
          console.log(key);
          if (Array.isArray(state[key]) && state[key].length > 0) {
            for (let i = 0; i < state[key].length; i++) {
              if (state[key][i].hasOwnProperty("Location *")) {
                state[key][i]["Location *"].value = action.payload.value;
              }
            }
          }
        });
      }
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    fillPorts: (state, action) => {
      if (state[action.payload.Step][action.payload.Current].hasOwnProperty("Ports")) {
        state[action.payload.Step][action.payload.Current]["Ports"].value = action.payload.value;
      }
    },
    fillPortContent: (state, action) => {
      state[action.payload.Step][action.payload.Current]["Ports"][action.payload.PortIndex] = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    replaceSetStructuredCabling: (state, action) => {
      state.Current.StructuredCablingSet = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    fillPortData: (state, action) => {
      console.log(action);
      state.StructuredCabling = [...state.StructuredCabling, action.payload.value];
    },
    addToOpenRU: (state, action) => {
      let OpenRUObject = {
        value: action.payload.value,
      };
      state.OpenRU = [...state.OpenRU, OpenRUObject];
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    updateOpenRu: (state, action) => {
      let OpenRUObject = {
        value: action.payload.value,
      };
      state.OpenRU[action.payload.Current] = OpenRUObject;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    addToNewItem: (state, action) => {
      console.log(action.payload);
      state[action.payload.Step] = [...state[action.payload.Step], Template[action.payload.Step]];
      state["Current"][action.payload.Step] = state[action.payload.Step].length - 1;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },

    addToStep: (state, action) => {
      let updatedRack = Template[action.payload.Step];
      if (action.payload.Step === "UPSs") {
        updatedRack = {
          ...updatedRack,
          "Location Type": {
            type: "text",
            value: action.payload.value,
            placeholder: "Input Here",
            options: [],
            required: false,
            disabled: true,
            APIMatch: "",
          },
        };
      }
      if (action.payload.Step === "Racks" || action.payload.Step === "PDUs") {
        updatedRack = {
          ...updatedRack,
          "Location *": {
            type: "text",
            value: state["Location"][0]["dcTrack Location Code *"].value,
            placeholder: "Input Here",
            options: [],
            disabled: true,
            required: false,
            APIMatch: "",
            NEXT: "HOLD FOR ADDITIONAL INFO",
            Export: "Location *",
          },
        };
      }
      if (action.payload.Step === "PDUs") {
        updatedRack = {
          ...updatedRack,
          "Cabinet *": {
            type: "text",
            value: state["Racks"][state.Current["Racks"]]["Name *"].value,
            placeholder: "Input Here",
            options: [],
            disabled: true,
            required: false,
            APIMatch: "",
            NEXT: "HOLD FOR ADDITIONAL INFO",
            Export: "Cabinet **",
          },
        };
      }
      state[action.payload.Step] = [...state[action.payload.Step], updatedRack];
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    addToRacks: (state, action) => {
      console.log(action.payload);
      let updatedRack = {
        ...Template[action.payload.Step],
        "U Position *": {
          type: "number",
          value: action.payload.UPosition,
          options: [],
          required: false,
          aPIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
          Export: "U Position **",
        },
      };
      updatedRack = {
        ...updatedRack,
        "Cabinet *": {
          type: "text",
          value: action.payload.Cabinet,
          placeholder: "Input Here",
          options: [],
          required: false,
          disabled: true,
          APIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
          Export: "Cabinet **",
        },
      };
      updatedRack = {
        ...updatedRack,
        "Location *": {
          type: "text",
          value: state["Location"][0]["dcTrack Location Code *"].value,
          placeholder: "Input Here",
          options: [],
          disabled: true,
          required: false,
          APIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
          Export: "Location *",
        },
      };
      if (action.payload.Step === "UPSs") {
        updatedRack = {
          ...updatedRack,
          "Location Type": {
            type: "text",
            value: "Cabinet",
            placeholder: "Input Here",
            options: [],
            required: false,
            disabled: true,
            APIMatch: "",
          },
        };
      }
      console.log(updatedRack);
      state[action.payload.Step] = [...state[action.payload.Step], updatedRack];
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    addToPDU: (state, action) => {
      let updatedPUD = {
        ...Template["PDUs"],
        "Cabinet Side *": {
          type: "select",
          value: action.payload.CabinetSide,
          placeholder: "Input Here",
          options: ["Select", "Left Side", "Right Side"],
          required: false,
          APIMatch: "",
          Export: "Cabinet Side **",
        },
      };
      updatedPUD = {
        ...updatedPUD,
        "Depth Position *": {
          type: "select",
          value: action.payload.DepthPosition,
          placeholder: "Input Here",
          options: ["Select", "Front", "Center", "Back"],
          required: false,
          APIMatch: "",
          Export: "Depth Position **",
        },
      };
      updatedPUD = {
        ...updatedPUD,
        "Location *": {
          type: "text",
          value: state["Location"][0]["dcTrack Location Code *"].value,
          placeholder: "Input Here",
          options: [],
          disabled: true,
          required: false,
          APIMatch: "",
          Export: "Location *",
        },
      };
      updatedPUD = {
        ...updatedPUD,
        "Cabinet *": {
          type: "text",
          value: action.payload.Cabinet,
          placeholder: "Input Here",
          options: [],
          disabled: true,
          required: false,
          APIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
          Export: "Cabinet **",
        },
      };
      updatedPUD = {
        ...updatedPUD,
        "U Position *": {
          type: "number",
          value: action.payload.UPosition,
          placeholder: "Input Here",
          options: [],
          required: false,
          aPIMatch: "",
          NEXT: "HOLD FOR ADDITIONAL INFO",
          Export: "U Position **",
        },
      };
      state["PDUs"] = [...state["PDUs"], updatedPUD];
      state["Current"]["PDUs"] = state["PDUs"].length - 1;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
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
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    updateCurrent: (state, action) => {
      state.Current[action.payload.Step] = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    replaceCurrent: (state, action) => {
      state[action.payload.Step][action.payload.current] = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    loginLogout: (state, action) => {
      state.LoggedIn = action.payload.value;

      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    deleteCurrentIndex: (state, action) => {
      state.Current[action.payload.Step] = state.Current[action.payload.Step] - 1;
      state[action.payload.Step].splice(action.payload.Current, 1);
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    setLocalStorage: (state, action) => {
      console.log("called");
      state.Settings.localStorage = action.payload.value;
    },
    // loadLocalStorage: (state, action) => {
    //   console.log(action.payload.Local);
    //   console.log(state);
    //   state = action.payload.Local;
    // },
    clearData: (state) => {
      localStorage.removeItem("PulseStateData");
      // localStorage.setItem("PulseStateData", JSON.stringify(TemplateState.state));
      window.location.reload();
      state = TemplateState.state;
    },
    setAllStateDataToActionPayloadValue: (state, action) => {
      return action.payload.value;
    },
    setDate: (state, action) => {
      state.Current.DataBaseDate = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    BuildStructuredCableSet: (state, action) => {
      console.log(action);
      state.Current.StructuredCablingSet[action.payload.Key] = action.payload.value;
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    BuildMultiStructuredCableSet: (state, action) => {
      for (let i = 0; i < action.payload.Key.length; i++) {
        state.Current.StructuredCablingSet[action.payload.Key[i]] = action.payload.value[i];
      }
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
    UpdateSurveyData: (state, action) => {
      for (let i = 0; i < action.payload.Key.length; i++) {
        state[action.payload.Step][0][action.payload.Key][action.payload.Update[i]] = action.payload.value[i];
      }
      if (state.Settings.localStorage) localStorage.setItem("PulseStateData", JSON.stringify(state));
    },
  },
});

export const {
  UpdateSurveyData,
  replaceSetStructuredCabling,
  BuildStructuredCableSet,
  BuildMultiStructuredCableSet,
  setDate,
  setAllStateDataToActionPayloadValue,
  fillPortData,
  fillPortContent,
  fillPorts,
  clearData,
  setLocalStorage,
  // loadLocalStorage,
  deleteCurrentIndex,
  updateOpenRu,
  addToOpenRU,
  addToPDU,
  addToNewItem,
  replaceCurrent,
  addToRacks,
  addObjectToKeyValueToObject,
  addRemoveCustomFields,
  addToStep,
  updateCurrent,
  loginLogout,
  changeData,
} = Slice.actions;
export default Slice.reducer;
