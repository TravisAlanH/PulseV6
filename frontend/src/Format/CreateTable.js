const OrderData = {
  LOCATION: ["# Operation *", "Object *", "dcTrack Location Code *", "dcTrack Location Name *", "dcTrack Location Hierarchy *", "dcTrack Location Parent", "Data Center Area *", "Country *", "Custom Field Testing 1 *", "Status *"],

  CABINET: ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Front Faces", "Status *"],

  PDUs: ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Cabinet Side *", "Depth Position *", "U Position *", "Ports", "Status *"],
  "RACK PDU-ZERO U": ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Cabinet Side *", "Depth Position *", "U Position *", "Status *"],
  "DEVICE-RACKABLE": ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "U Position *", "Asset Tag", "Rails Used *", "Orientation *", "Status *"],
  "DEVICE-BLADE": ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Chassis *", "Slot Position *", "Asset Tag", "Chassis Face *", "Status *"],

  UPSs: ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Location Type", "U Position *", "RU Height", "kw Rating *", "Utilized kw", "Network connected", "Asset Tag"],
  "Zero U PDUs": ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Location Type", "U Position *", "RU Height", "kw Rating *", "Utilized kw", "Network connected", "Asset Tag"],
  ATSs: ["# Operation *", "Object *", "Name *", "Make *", "Model *", "Location *", "Cabinet *", "Location Type", "U Position *", "RU Height", "kw Rating *", "Utilized kw", "Network connected", "Asset Tag"],
  Panels: ["# Operation *", "Object *", "Name *", "Location *", "Upstream Connection"],

  Receptacles: ["# Operation *", "Object *", "Location *", "Placement", "Cabinet Placement", "Wall Placement"],
};

function CheckCustomHeaders(Key, Step) {
  const NormalHeaders = OrderData[Step];
  if (NormalHeaders.includes(Key)) {
    return Key;
  } else {
    return `Custom Field ${Key}`.replace("*", "");
  }
}

function removeHeader(key) {
  let removedList = ["ATG Room Name"];
  if (removedList.includes(key)) {
    return true;
  }
  return false;
}

function changeHeader(key) {
  let changedList = {
    "ATG Room Number": "ATG Location Room Number",
  };
  if (changedList.hasOwnProperty(key)) {
    return changedList[key];
  }
  return key;
}

function createTable(data, tableId) {
  console.log("Create Table", data);
  var table = document.getElementById(tableId);

  var headerRow = document.createElement("tr");
  for (var key in data[0]) {
    if (removeHeader(key)) {
      continue;
    }
    key = changeHeader(key);
    if (key.includes("Test")) {
      continue;
    }
    if (key === "Custom Field Testing 1 *") {
      continue;
    }
    if (key === `36" Clearance Fire / Power Panels`) {
      continue;
    }
    if (key === "Survey Date") {
      continue;
    }
    var headerCell = document.createElement("th");
    headerCell.textContent = CheckCustomHeaders(key, data[0]["Object *"]);

    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  data.forEach(function (rowObj) {
    console.log(rowObj);
    var row = document.createElement("tr");

    for (var key in rowObj) {
      if (removeHeader(key)) {
        continue;
      }
      if (key === "Custom Field Testing 1 *") {
        continue;
      }
      if (key === `36" Clearance Fire / Power Panels`) {
        continue;
      }
      if (key === "Survey Date") {
        continue;
      }
      var cell = document.createElement("td");
      cell.textContent = rowObj[key];
      row.appendChild(cell);
    }
    table.appendChild(row);
  });
}

export default createTable;
