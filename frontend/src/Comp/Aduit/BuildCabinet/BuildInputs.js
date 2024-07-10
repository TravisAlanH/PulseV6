import React from "react";
import { useSelector } from "react-redux";
import Template from "../../../Store/Slices/Template";
import FillNames from "./FillNames";
import * as DataTemplates from "./DataTemplates";

export default function BuildInputs({ SelectedMLTItem, UPosition, setSavingData, setStep, SideDepth, Chassis }) {
  const LocationName = useSelector((state) => state.data.Location[0]["dcTrack Location Code *"].value);
  const UUID = useSelector((state) => state.data.Current.DataBaseUUID);
  const State = useSelector((state) => state.data);
  const CurrentRack = useSelector((state) => state.data.Current.Racks);
  const CurrentCabinet = useSelector((state) => state.data.Racks[CurrentRack]);
  const CabinetName = CurrentCabinet["Name *"].value;
  // const [loading, setLoading] = React.useState(false);
  console.log("SelectedMLTItem", SelectedMLTItem);
  const Class = SelectedMLTItem.Class;
  console.log("Class", Class);
  const subClass = SelectedMLTItem.SubClass;
  console.log("subClass", subClass);
  const mounting = SelectedMLTItem.Mounting;
  console.log("mounting", mounting);
  let Step = "";
  //   ! Add Additional Classes here
  if (Class === "Device" || Class === "Networks" || Class === "Data Panel" || (Class === "Passive" && mounting !== "Blade" && subClass !== "Blade")) {
    Step = "Assets";
    setStep("Assets");
  }
  if (subClass === "Blade" || mounting === "Blade") {
    Step = "Blades";
    setStep("Blades");
  }
  if (Class === "Rack PDU") {
    Step = "PDUs";
    setStep("PDUs");
  }
  if (Class === "UPS") {
    Step = "UPS";
    setStep("UPS");
  }

  console.log("Step", Step);

  //   ! Add Additional Classes here

  const [SaveTemplate, setSaveTemplate] = React.useState(
    Step === "Assets"
      ? DataTemplates.Assets(Template, Step, UPosition, SelectedMLTItem, LocationName, CabinetName)
      : Step === "PDUs"
      ? DataTemplates.PDUs(Template, Step, UPosition, SelectedMLTItem, LocationName, CabinetName, SideDepth)
      : Step === "Blades"
      ? DataTemplates.Blades(Template, Step, SelectedMLTItem, LocationName, CabinetName, Chassis, SideDepth)
      : { ...Template[Step] }
  );

  console.log("SaveTemplate", SaveTemplate);
  console.log(Chassis);

  React.useEffect(() => {
    setSavingData(SaveTemplate);
  }, [SaveTemplate, setSavingData]);

  function handleNameFill() {
    const payload = {
      UUID: UUID,
      Step: Step,
      State: State,
      SelectedMLTItem: SelectedMLTItem,
      UPosition: UPosition,
      Chassis: Chassis,
      Slot: SideDepth.Depth,
    };

    let FillData = FillNames(payload);
    let newTemplate = JSON.parse(JSON.stringify(SaveTemplate));

    if (!Object.isFrozen(newTemplate) && !Object.isFrozen(newTemplate["Name *"])) {
      newTemplate["Name *"]["value"] = FillData;
      setSaveTemplate(newTemplate);
    } else {
      console.error("newTemplate or newTemplate['Name *'] is frozen or sealed.");
    }
  }
  console.log(Step);
  const MapArray = Object.keys(Template[Step]);

  const textInputStyle = "w-[13rem] h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit border-l-2";
  const textInputStyleWithButton = "w-[10.5rem] h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit border-l-2";

  function HandleTemplateUpdate(item, value) {
    console.log(value);
    console.log(item);
    let newTemplate = { ...SaveTemplate };
    newTemplate[item]["value"] = value;
    console.log("newTemplate", newTemplate);
    setSaveTemplate(newTemplate);
  }

  const Input = (item) => {
    const checking = SaveTemplate[item]["type"];
    switch (checking) {
      case "text":
        return (
          <div id="textInput">
            <input
              type="text"
              className={item === "Name *" ? textInputStyleWithButton : textInputStyle}
              {...(item === "Name *" ? { value: SaveTemplate[item].value, required: true } : {})}
              {...(item === "Make *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              {...(item === "Model *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              {...(item === "Cabinet *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              {...(item === "Location *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              {...(item === "Mounting" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              {...(item === "Chassis *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
              onChange={(e) => HandleTemplateUpdate(item, e.target.value)}
            />
            {item === "Name *" ? (
              <button
                className="orangeButton"
                onClick={() => {
                  handleNameFill();
                }}
              >
                Fill
              </button>
            ) : null}
          </div>
        );
      case "number":
        return (
          <input
            type="number"
            className={textInputStyle}
            {...(item === "U Position *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
            {...(item === "RU Height" ? { value: SelectedMLTItem.RUHeight, disabled: true } : {})}
            {...(item === "Ports" ? { value: SelectedMLTItem.DataPortsCount, disabled: true } : {})}
            {...(item === "Slots Front" ? { value: SaveTemplate[item].value, disabled: true } : {})}
            {...(item === "Slots Back" ? { value: SaveTemplate[item].value, disabled: true } : {})}
            {...(item === "Slot Position *" ? { value: SaveTemplate[item].value, disabled: true } : {})}
            onChange={(e) => HandleTemplateUpdate(item, e.target.value)}
          />
        );
      case "select":
        return (
          <select className={textInputStyle} onChange={(e) => HandleTemplateUpdate(item, e.target.value)} value={SaveTemplate[item].value}>
            {SaveTemplate[item].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return <input type="text" defaultValue={SaveTemplate[item].value} className={textInputStyle} disabled />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {MapArray.map((item, index) => {
        return (
          <div key={index} className="flex flex-row">
            <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">{item.includes("*") ? "*" : ""}</div>
            <label className={"text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[6rem]"}>{item.replace("*", "")}</label>
            <div>{Input(item)}</div>
          </div>
        );
      })}
    </div>
  );
}
