const OrderData = {
  Location: [
    "# Operation *",
    "Object *",
    "dcTrack Location Code *",
    "dcTrack Location Name *",
    "dcTrack Location Hierarchy *",
    "dcTrack Location Parent",
    "Data Center Area *",
    "Country *",
    "Custom Field Testing 1 *",
    "Status *",
  ],

  Racks: ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Front Faces", "Status *"],

  PDUs: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Cabinet Side *",
    "Depth Position *",
    "U Position *",
    "Ports",
    "Status *",
  ],
  "Rack PDUs": [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Cabinet Side *",
    "Depth Position *",
    "U Position *",
    "Status *",
  ],
  Assets: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "U Position *",
    "Asset Tag",
    "Rails Used *",
    "Orientation *",
    "Status *",
  ],
  Blades: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Chassis *",
    "Slot Position *",
    "Asset Tag",
    "Chassis Face *",
    "Status *",
  ],

  UPSs: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Location Type",
    "U Position *",
    "RU Height",
    "kw Rating *",
    "Utilized kw",
    "Network connected",
    "Asset Tag",
  ],
  "Zero U PDUs": [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Location Type",
    "U Position *",
    "RU Height",
    "kw Rating *",
    "Utilized kw",
    "Network connected",
    "Asset Tag",
  ],
  ATSs: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "Location *",
    "Cabinet *",
    "Location Type",
    "U Position *",
    "RU Height",
    "kw Rating *",
    "Utilized kw",
    "Network connected",
    "Asset Tag",
  ],
  SurveyGlobal: [
    "Key Holder Record",
    "Access Records",
    "Visitor Access Records",
    "Visitor Log Contains",
    "Visitor Log Retention",
    "Auto Expiring Badges",
    "Visitor Escort Required",
  ],
  SurveyRoom: [
    "Room Number *",
    "GPS Coordinates *",
    "Area *",
    "Ceiling Type *",
    "Ceiling Condition *",
    "Floor Type *",
    "Floor Condition *",
    "Wall Type *",
    "Wall Condition *",
    "Cleanliness *",
    "Room Notes",
  ],
  SurveySecurity: ["Access Door Control", "Is the Room Secure?", "Available Key Access", "Door Manual Unlocking", "Avigilon camera Present?"],

  SurveySite: [
    "Survey Date",
    "Company Surveying",
    "Survey Tech Name",
    "Survey Tech Phone",
    "Survey Tech Email",
    "Site",
    "Building",
    "Floor",
    "ATG Room Number",
    "ATG Room Name",
    "Alias Room Name",
    "Barcode",
    "Survey Tech Role",
    "Site Type",
    "Site Name",
    "Site Address",
    "Site Country",
    "Local Site Contact",
    "Site Contact Role",
    "Site Contact Email",
    "Site Contact Phone",
    "Access Times",
  ],
  SurveySafety: [
    "Fire Extinguishers?",
    "Phone for EMS?",
    "Fire Suppression System?",
    "Smoke Detectors Present?",
    "Fire Indicators Present?",
    "Emergency Power / Lighting?",
    "Emergency Frog Lights?",
    "Validate Conduit Penetrations",
    "Validate Maintenance Penetrations",
    '36" Clearance Fire / Power Panels',
    "Room State",
    "Tripping / Clothesline Hazards",
    "Room Used for Storage?",
    "Trash Disposeal Loction?",
    "Empty Trash Car?",
  ],

  Panels: ["# Operation *", "Object *", "Name *", "Location *", "Upstream Connection"],

  Receptacles: ["# Operation *", "Object *", "Location *", "Placement", "Cabinet Placement", "Wall Placement"],
};

export default function sortArrayToMatchReference(arrayToSort, Step) {
  let referenceArray = OrderData[Step];
  const referenceIndices = new Map();

  referenceArray.forEach((element, index) => {
    referenceIndices.set(element, index);
  });

  return arrayToSort.sort((a, b) => {
    const indexA = referenceIndices.get(a);
    const indexB = referenceIndices.get(b);
    return indexA - indexB;
  });
}

export function sortObjectByTemplate(object, Step, Data) {
  var reorderedObject = {};

  console.log(Data);

  let DataOrder = OrderData[Step];
  let DataObject = object;
  if (Step === "Location") {
    const SurveyObject = { ...Data.SurveyGlobal[0], ...Data.SurveySite[0], ...Data.SurveyRoom[0], ...Data.SurveySecurity[0], ...Data.SurveySafety[0] };
    const keys = Object.keys(SurveyObject);
    let temp = {};
    for (let i = 0; i < keys.length; i++) {
      temp[`${keys[i]}`] = SurveyObject[keys[i]].value;
    }

    DataObject = { ...DataObject, ...temp };

    console.log(DataObject);

    DataOrder = [
      ...DataOrder,
      ...OrderData.SurveyGlobal,
      ...OrderData.SurveyRoom,
      ...OrderData.SurveySecurity,
      ...OrderData.SurveySite,
      ...OrderData.SurveySafety,
    ];
  }

  DataOrder.forEach(function (key) {
    reorderedObject[key] = DataObject[key];
  });
  return reorderedObject;
}
