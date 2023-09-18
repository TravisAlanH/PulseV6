import countries from "./TemplateHelpers/Counties";

//* ADD OR REMOVE OPTIONS FROM THE DROP DOWNS WHEN ADDING DATA
//* ie: ADD ROW => ADD TO OPTION IN THE CABINET DROP DOWN

let Template = {
  Location: {
    ///////////////
    "# Operation*": "ADD",
    "Object*": "LOCATION",
    "dcTrack Location Code*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "dcTrack Location Name*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "dcTrack Location Hierarchy*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "dcTrack Location Parent*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Data Center Area*": {
      type: "number",
      value: 0,

      options: [],
      required: false,
      aPIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Country*": {
      type: "select",
      value: "",

      options: countries,
      required: false,
      aPIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Status*": "PLANNED",
  },
  //////////////////
  Rooms: {
    "# Operation*": "ADD",
    "Object*": "SUBLOCATION",
    "Sub Location Type*": {
      type: "select",
      value: "",
      placeholder: "Input Here",
      options: ["Select", "Aisle", "Row"],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Sub Location Name*": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Location*": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },

    "Parent Sub Location": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Capacity(kW)": {
      type: "number",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
  },
  //////////////////
  Racks: {
    "Operation *": "ADD",
    "Object *": "CABINET",
    "Name *": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Make *": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Model *": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Part Number": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Location *": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Location Name": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Front Faces *": {
      type: "select",
      value: "",
      placeholder: "Input Here",
      options: ["North", "South", "East", "West"],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Aisle Label *": {
      type: "Programmed",
      value: "",
      required: false,
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Row Label **": {
      type: "Programmed",
      value: "",
      required: false,
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Position in Row **": {
      type: "number",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Power Capacity (kW)": {
      type: "number",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Weight Capacity": {
      type: "number",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Status *": "PLANNED",
  },
  //////////////////
  Assets: {
    "# Operation*": "ADD",
    "Object*": "DEVICE-RACKABLE",
    "Name*": {
      type: "text",
      value: "",
      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Make*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Model*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },

    "Location*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Cabinet*": {
      type: "text",
      value: "",

      placeholder: "Input Here",
      options: [],
      required: false,
      APIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "U Position*": {
      type: "number",
      value: 0,

      options: [],
      required: false,
      aPIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Rails Used*": {
      type: "select",
      value: "",

      options: [],
      required: false,
      aPIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Orientation*": {
      type: "select",
      value: "",

      options: [],
      required: false,
      aPIMatch: "",
      NEXT: "HOLD FOR ADDITIONAL INFO",
    },
    "Status*": "PLANNED",
  },
};

const state = {
  Location: [],
  Rooms: [],
  Racks: [],
  Assets: [],
  LoggedIn: false,
  Current: {
    Location: 0,
    Rooms: 0,
    Racks: 0,
    Assets: 0,
  },
};

export default Template;
export { state };

// let hold = {
//   type: "text",
//   value: "",
//
//   placeholder: "Input Here",
//   options: [],
//   required: false,
//   APIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let hold2 = {
//   type: "number",
//   value: 0,
//
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let hold3 = {
//   type: "date",
//   value: "2007-06-09",
//
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let hold4 = {
//   type: "bool",
//   value: false,
//
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let hold5 = {
//   type: "select",
//   value: "",
//
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };
