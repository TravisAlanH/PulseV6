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

const CreateTemplatesAssets = {
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
  "Warranty Period": text,
  "Class *": text,
  "Mounting *": {
    type: "select",
    value: "",
    options: ["Busway", "VStack", "Blade", "Rackable", "Non-Rackable", "Suspended"],
    required: false,
    aPIMatch: "",
    NEXT: "HOLD FOR ADDITIONAL INFO",
  },
  "Form Factor *": {
    type: "select",
    value: "",
    options: [
      "2-Post Frame",
      "4-Post Frame",
      "Blanking Plate",
      "Chassis",
      "Fixed",
      "Full",
      "Full-Double",
      "Half",
      "Quarter",
      "Shelf",
    ],
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
  "Version (read-only)": text,
  "Auto Power Budget": number,
  Notes: textarea,
  "CPU Sockets": text,
  "RAM Slots": number,
  "Expansion Slots": number,
  "Daughter Board Slots": number,
  "Disk Bays": number,
  "Power Supply Slots": number,
};

export default CreateTemplatesAssets;
