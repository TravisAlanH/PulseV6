import countries from "../../../Store/Slices/TemplateHelpers/Counties";

let text = {
  type: "text",
  value: "",
  placeholder: "Input Here",
  options: [],
  required: false,
  APIMatch: "",
  NEXT: "HOLD FOR ADDITIONAL INFO",
};

let number = {
  type: "number",
  value: 0,
  options: [],
  required: false,
  aPIMatch: "",
  NEXT: "HOLD FOR ADDITIONAL INFO",
};

let textarea = {
  type: "textarea",
  value: "",
  placeholder: "Input Here",
  options: [],
  required: false,
  aPIMatch: "",
  NEXT: "HOLD FOR ADDITIONAL INFO",
};

const CreateTemplatePDU = {
  "# Operation *": { value: "ADD" },
  "Object *": { value: "RACK PDU" },
  "Make *": text,
  "Model Name *": text,
  "New Model Name": text,
  Ports: {
    type: "number",
    value: 0,
    placeholder: "Input Here",
    options: [],
    required: false,
    disabled: false,
    APIMatch: "DataPortsCount",
    NEXT: "HOLD FOR ADDITIONAL INFO",
    Export: "",
  },
  "Part Number": text,
  "New Part Number": text,
  Description: textarea,
  "Made in": {
    type: "select",
    value: "",
    options: countries,
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },

  "Class *": {
    type: "select",
    value: "",
    options: [
      "Basic",
      "Metered",
      "Monitored",
      "Switched",
      "Switched Metered",
      "Switched Outlet",
      "Switched Outlet Metered",
    ],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Subclass**": {
    type: "select",
    value: "",
    options: [
      "Basic",
      "Metered",
      "Monitored",
      "Switched",
      "Switched Metered",
      "Switched Outlet",
      "Switched Outlet Metered",
    ],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Mounting *": {
    type: "select",
    value: "",
    options: ["Vertical", "Horizontal"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Form Factor *": {
    type: "select",
    value: "",
    options: ["Busway", "VStack", "Blade", "Rackable", "Non-Rackable", "Suspended"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Rack Units *": {
    type: "number",
    value: 1,
    options: [],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Height *": number,
  Width: number,
  Depth: number,
  Weight: number,
  Units: number,
  Notes: textarea,
  "Rating (kVa)": number,
  "Main Breaker (A)": number,
  "Max Panels": number,
  "Compensation Factor (%)": number,
};

// let text = {
//   type: "text",
//   value: "",
//   placeholder: "Input Here",
//   options: [],
//   required: false,
//   APIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let number = {
//   type: "number",
//   value: 0,
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let date = {
//   type: "date",
//   value: "2007-06-09",
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let bool = {
//   type: "bool",
//   value: false,
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

// let select = {
//   type: "select",
//   value: "",
//   options: [],
//   required: false,
//   aPIMatch: "",
//   NEXT: "HOLD FOR ADDITIONAL INFO",
// };

export default CreateTemplatePDU;
