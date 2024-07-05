function Assets(Template, Step, UPosition, SelectedMLTItem, LocationName, CabinetName) {
  console.log("SelectedMLTItem", SelectedMLTItem);
  const data = {
    ...Template[Step],
    "U Position *": {
      ...Template[Step]["U Position *"],
      value: UPosition,
    },
    "RU Height": {
      ...Template[Step]["RU Height"],
      value: SelectedMLTItem.RUHeight,
    },
    "Rails Used *": {
      ...Template[Step]["Rails Used *"],
      value: "Both",
    },
    "Orientation *": {
      ...Template[Step]["Orientation *"],
      value: "Item Front Faces Cabinet Front",
    },
    "Make *": {
      ...Template[Step]["Make *"],
      value: SelectedMLTItem.Make,
    },
    "Model *": {
      ...Template[Step]["Model *"],
      value: SelectedMLTItem.Model,
    },
    Ports: {
      ...Template[Step]["Ports"],
      value: SelectedMLTItem.DataPortsCount,
    },
    "Location *": {
      ...Template[Step]["Location *"],
      value: LocationName,
    },
    "Cabinet *": {
      ...Template[Step]["Cabinet *"],
      value: CabinetName,
    },
    Mounting: {
      ...Template[Step]["Mounting"],
      value: SelectedMLTItem.Mounting,
    },
    "Slots Front": {
      ...Template[Step]["Slots Front"],
      value: SelectedMLTItem.FrontSlotsCount,
    },
    "Slots Back": {
      ...Template[Step]["Slots Back"],
      value: SelectedMLTItem.BackSlotsCount,
    },
  };

  return data;
}

function Blades(Template, Step, SelectedMLTItem, LocationName, CabinetName, ChassisName) {
  console.log("SelectedMLTItem", SelectedMLTItem);
  const data = {
    ...Template[Step],
    "Chassis *": {
      ...Template[Step]["U Position *"],
      value: ChassisName,
    },
    "Chassis Face *": {
      ...Template[Step]["Rails Used *"],
      value: "Both",
    },
    "Slot Position *": {
      ...Template[Step]["Orientation *"],
      value: "Item Front Faces Cabinet Front",
    },
    "Make *": {
      ...Template[Step]["Make *"],
      value: SelectedMLTItem.Make,
    },
    "Model *": {
      ...Template[Step]["Model *"],
      value: SelectedMLTItem.Model,
    },
    Ports: {
      ...Template[Step]["Ports"],
      value: SelectedMLTItem.DataPortsCount,
    },
    "Location *": {
      ...Template[Step]["Location *"],
      value: LocationName,
    },
    "Cabinet *": {
      ...Template[Step]["Cabinet *"],
      value: CabinetName,
    },
    Mounting: {
      ...Template[Step]["Mounting"],
      value: SelectedMLTItem.Mounting,
    },
  };

  return data;
}

function PDUs(Template, Step, UPosition, SelectedMLTItem, LocationName, CabinetName, SideDepth) {
  console.log(SideDepth);
  console.log("SelectedMLTItem", SelectedMLTItem);
  const data = {
    ...Template[Step],
    "U Position *": {
      ...Template[Step]["U Position *"],
      value: UPosition,
    },
    "RU Height": {
      ...Template[Step]["RU Height"],
      value: SelectedMLTItem.RUHeight,
    },
    "Make *": {
      ...Template[Step]["Make *"],
      value: SelectedMLTItem.Make,
    },
    "Model *": {
      ...Template[Step]["Model *"],
      value: SelectedMLTItem.Model,
    },
    Ports: {
      ...Template[Step]["Ports"],
      value: SelectedMLTItem.DataPortsCount,
    },
    "Location *": {
      ...Template[Step]["Location *"],
      value: LocationName,
    },
    "Cabinet *": {
      ...Template[Step]["Cabinet *"],
      value: CabinetName,
    },
    Mounting: {
      ...Template[Step]["Mounting"],
      value: SelectedMLTItem.Mounting,
    },
    "Slots Frount": {
      ...Template[Step]["Slot Frount"],
      value: SelectedMLTItem.FrontSlotsCount,
    },
    "Slots Back": {
      ...Template[Step]["Slots Back"],
      value: SelectedMLTItem.BackSlotsCount,
    },
    "Depth Position *": {
      ...Template[Step]["Depth Position *"],
      value: SideDepth.Depth,
    },
    "Cabinet Side *": {
      ...Template[Step]["Cabinet Side *"],
      value: SideDepth.Side,
    },
  };
  return data;
}

export { Assets, PDUs, Blades };
