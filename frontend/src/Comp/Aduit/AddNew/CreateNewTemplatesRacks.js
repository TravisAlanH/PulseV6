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

const CreateTemplatesRacks = {
  "# Operation *": { value: "ADD" },
  "Object *": { value: "MODEL" },
  "Make *": text,
  "Model Name *": text,
  "New Model Name": text,
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
  "Weight Capacity": number,
  "Class *": {
    type: "select",
    value: "",
    options: ["", "A", "B", "C", "D", "E", "F", "G", "H"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Subclass**": {
    type: "select",
    value: "",
    options: ["", "1", "2", "3", "4", "5", "6", "7", "8"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Mounting *": {
    type: "select",
    value: "",
    options: ["", "Free Standing", "Wall Mount", "Rack Mount"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },

  "Form Factor *": {
    type: "select",
    value: "",
    options: ["", "2-Post Frame", "4-Post Frame", "Open Frame", "Enclosed Frame"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },

  "Rack Units *": number,
  "Height *": number,
  Width: number,
  Depth: number,
  Weight: number,
  Units: number,
  Notes: textarea,
};

export default CreateTemplatesRacks;
