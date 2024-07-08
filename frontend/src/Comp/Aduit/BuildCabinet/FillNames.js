function CountInRackTotal(payload) {
  let Count = 0;
  const AssetCount = payload.State.Assets.filter((item) => item["Cabinet *"].value === payload.State.Racks[payload.State.Current.Racks]["Name *"].value).length;
  const PDUCount = payload.State.PDUs.filter((item) => item["Cabinet *"].value === payload.State.Racks[payload.State.Current.Racks]["Name *"].value).length;
  const ATSCount = payload.State.ATSs.filter((item) => item["Cabinet *"].value === payload.State.Racks[payload.State.Current.Racks]["Name *"].value).length;
  const UPSCount = payload.State.UPSs.filter((item) => item["Cabinet *"].value === payload.State.Racks[payload.State.Current.Racks]["Name *"].value).length;
  const PanelCount = payload.State.Panels.filter((item) => item["Cabinet *"].value === payload.State.Racks[payload.State.Current.Racks]["Name *"].value).length;
  Count = AssetCount + PDUCount + ATSCount + UPSCount + PanelCount;
  return Count;
}

function CountInLocationTotal(payload) {
  let Count = 0;
  const AssetCount = payload.State.Assets.length;
  const PDUCount = payload.State.PDUs.length;
  const ATSCount = payload.State.ATSs.length;
  const UPSCount = payload.State.UPSs.length;
  const PanelCount = payload.State.Panels.length;
  Count = AssetCount + PDUCount + ATSCount + UPSCount + PanelCount;
  return Count;
}

function findNonBaselineElements(BaseLineArray, Format) {
  // Use the filter method to find elements in inputArray that are not in baselineArray
  return Format.filter((element) => !BaseLineArray.includes(element));
}

function CheckIfDelimterIsNeeded(Delimiter, index, Format) {
  if (index === Format.length - 1) return "";
  return Delimiter;
}

function SubstringInputString(inputString, CharacterCount) {
  if (CharacterCount === -1) return inputString;
  return inputString.substring(0, CharacterCount);
}

export default function FillNames(payload) {
  if (localStorage.getItem("NamingList") === null) return "";
  let name = "";
  const NameParameters = JSON.parse(localStorage.getItem("NamingList")).filter((item) => item.DataBaseUUID === payload.UUID)[0];
  const NamingCon = NameParameters.NamingCon;

  if (NamingCon.length === 0) return name;
  const NamingConStep = NamingCon.filter((item) => item.Step === payload.Step)[0];

  if (NamingConStep === undefined) return;

  const CharCount = NamingConStep.CharacterCount;
  const Delimiter = NamingConStep.Delimiters;
  const Format = NamingConStep.Format;

  const Location = payload.State.Location[0]["dcTrack Location Code *"].value;
  const Make = payload.SelectedMLTItem.Make;
  const Model = payload.SelectedMLTItem.Model;
  const Cabinet = payload.State.Racks[payload.State.Current.Racks]["Name *"].value;
  const UP = payload.UPosition;
  const CountInRack = CountInRackTotal(payload);
  const countInLocation = CountInLocationTotal(payload);

  const BaseLineArray = ["Location", "Make", "Model", "Cabinet", "UP", "Chassis", "Slot", "Count In Rack", "Count In Location"];

  console.log("payload", payload);

  Format.forEach((element, index) => {
    if (findNonBaselineElements(BaseLineArray, [element]).length !== 0) {
      name += SubstringInputString(element, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
      return;
    }
    switch (element) {
      case "Location":
        name += SubstringInputString(Location, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Make":
        name += SubstringInputString(Make, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Model":
        name += SubstringInputString(Model, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Cabinet":
        name += SubstringInputString(Cabinet, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "UP":
        name += SubstringInputString(UP, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Count In Rack":
        name += SubstringInputString(CountInRack, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Count In Location":
        name += SubstringInputString(countInLocation, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Chassis":
        name += SubstringInputString(payload.Chassis, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      case "Slot":
        name += SubstringInputString(payload.Slot, CharCount[index]) + CheckIfDelimterIsNeeded(Delimiter, index, Format);
        break;
      default:
        break;
    }
  });

  return name;
}
