import React from "react";
import { useSelector } from "react-redux";
import Template from "../../../Store/Slices/Template";

export default function BuildInputs({ SelectedMLTItem, UPosition }) {
  const LocationName = useSelector(
    (state) => state.data.Location[0]["dcTrack Location Code *"].value
  );
  const CurrentRack = useSelector((state) => state.data.Current.Racks);
  const CurrentCabinet = useSelector((state) => state.data.Racks[CurrentRack]);
  const CabinetName = CurrentCabinet["Name *"].value;
  // const [loading, setLoading] = React.useState(false);
  const Class = SelectedMLTItem.Class;
  let Step = "";
  //   ! Add Additional Classes here
  if (Class === "Device" || "Networks" || "Data Panel" || "Passive")
    Step = "Assets";
  if (Class === "Rack PDU") Step = "PDUs";
  if (Class === "UPS") Step = "ATSs";
  //   ! Add Additional Classes here

  const [SaveTemplate, setSaveTemplate] = React.useState(
    Step === "Assets"
      ? {
          ...Template[Step],
          "U Position *": {
            ...Template[Step]["U Position *"],
            value: UPosition,
          },
          "Rails Used *": {
            ...Template[Step]["Rails Used *"],
            value: "Both",
          },
          "Orientation *": {
            ...Template[Step]["Orientation *"],
            value: "Item Front Faces Cabinet Front",
          },
        }
      : Step === "PDUs"
      ? {
          ...Template[Step],
          "U Position *": {
            ...Template[Step]["U Position *"],
            value: UPosition,
          },
        }
      : { ...Template[Step] }
  );

  const MapArray = Object.keys(Template[Step]);

  const textInputStyle =
    "w-[13rem] h-[2rem] px-2 text-black border-b-2 border-[#F7F5F1] bg-inherit border-l-2";

  //   console.log(SaveTemplate);
  //   console.log(MapArray);
  console.log(SaveTemplate);

  function HandleTemplateUpdate(item, value) {
    let newTemplate = { ...SaveTemplate };
    newTemplate[item]["value"] = value;
    setSaveTemplate(newTemplate);
  }

  const Input = (item) => {
    const checking = SaveTemplate[item]["type"];
    switch (checking) {
      case "text":
        return (
          <input
            type="text"
            className={textInputStyle}
            {...(item === "Make *"
              ? { value: SelectedMLTItem["Make"], disabled: true }
              : {})}
            {...(item === "Model *"
              ? { value: SelectedMLTItem["Model"], disabled: true }
              : {})}
            {...(item === "Cabinet *"
              ? { value: CabinetName, disabled: true }
              : {})}
            {...(item === "Location *"
              ? { value: LocationName, disabled: true }
              : {})}
            onChange={(e) => HandleTemplateUpdate(item, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            className={textInputStyle}
            {...(item === "U Position *"
              ? { value: SaveTemplate[item].value, disabled: true }
              : {})}
            {...(item === "RU Height"
              ? { value: SelectedMLTItem.RUHeight, disabled: true }
              : {})}
            {...(item === "Ports"
              ? { value: SelectedMLTItem.DataPortsCount, disabled: true }
              : {})}
            onChange={(e) => HandleTemplateUpdate(item, e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className={textInputStyle}
            onChange={(e) => HandleTemplateUpdate(item, e.target.value)}
          >
            {SaveTemplate[item].options.map((option, index) => {
              if (option === SaveTemplate[item].value) {
                return (
                  <option key={index} value={option} selected>
                    {option}
                  </option>
                );
              }
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        );
      default:
        return (
          <input
            type="text"
            defaultValue={SaveTemplate[item].value}
            className={textInputStyle}
            disabled
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {MapArray.map((item, index) => {
        return (
          <div key={index} className="flex flex-row">
            <div className="w-[1rem] flex flex-row justify-center items-center text-red-500">
              {item.includes("*") ? "*" : ""}
            </div>
            <label
              className={
                "text-xs font-bold  p-1 bg-[#F7F5F1] flex flex-col justify-center w-[6rem]"
              }
            >
              {item.replace("*", "")}
            </label>
            <div>{Input(item)}</div>
          </div>
        );
      })}
    </div>
  );
}
