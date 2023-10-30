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
};

const Panels = ["# Operation *", "Object *", "Name *", "Location *", "Upstream Connection"];

const Receptacles = ["# Operation *", "Object *", "Location *", "Placement", "Cabinet Placement", "Wall Placement"];

export default function sortArrayToMatchReference(arrayToSort, Step) {
  let referenceArray = OrderData[Step];
  const referenceIndices = new Map();

  referenceArray.forEach((element, index) => {
    referenceIndices.set(element, index);
  });

  arrayToSort.sort((a, b) => {
    const indexA = referenceIndices.get(a);
    const indexB = referenceIndices.get(b);
    return indexA - indexB;
  });
}
