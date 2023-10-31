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

  Racks: [
    "# Operation *",
    "Object *",
    "Name *",
    "Make *",
    "Model *",
    "RU Height",
    "Location *",
    "Front Faces",
    "Ports",
    "Status *",
  ],

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
    "RU Height",
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
    "RU Height",
    "Ports",
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
    "RU Height",
    "Asset Tag",
    "Rails Used *",
    "Orientation *",
    "Ports",
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
    "Total connections",
    "Type of Connections",
    "Ports",
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
    "Total connections",
    "Type of Connections",
    "Ports",
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
    "Total connections",
    "Type of Connections",
    "Ports",
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
  SurveySecurity: [
    "Access Door Control",
    "Is the Room Secure?",
    "Available Key Access",
    "Door Manual Unlocking",
    "Avigilon camera Present?",
  ],

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

export function sortObjectByTemplate(object, Step) {
  var reorderedObject = {};
  console.log(Step);
  console.log(OrderData[Step]);
  OrderData[Step].forEach(function (key) {
    reorderedObject[key] = object[key];
  });
  return reorderedObject;
}
