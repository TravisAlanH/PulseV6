function formatDataForPDU(data) {
  let Zero = [];
  let Rack = [];

  data["PDUs"].forEach((pdu) => {
    if (pdu["Depth Position *"].value !== "") {
      let hold = pdu;
      Zero.push(hold);
    } else {
      let hold = pdu;
      delete hold["Depth Position *"];
      delete hold["Cabinet Side *"];
      Rack.push(hold);
    }
  });

  Zero.forEach((item) => {
    item["Object *"] = { value: "RACK PDU-ZERO U", Export: "Object *" };
  });

  Rack.forEach((item) => {
    item["Object *"] = { value: "RACK PDU-RACKABLE", Export: "Object *" };
  });

  let ReturnData = data;
  delete ReturnData["PDUs"];
  ReturnData["Zero U PDUs"] = Zero;
  ReturnData["Rack PDUs"] = Rack;

  return ReturnData;
}

export { formatDataForPDU };
