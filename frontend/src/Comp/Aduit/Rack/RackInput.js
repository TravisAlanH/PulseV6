import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";
import SearchLayout from "../../Search/SearchLayout";
import CreateNewViewButton from "../AddNew/CreateNewViewButton";

export default function RackInput({ AllData }) {
  const Step = "Racks";

  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  const Keys = Object.keys(State);

  const CheckArray = ["Name *", "Make *", "Model *"];
  let MapArray = [];

  if (State["Make *"].value === "" || State["Model *"].value === "" || State["Name *"].value === "") {
    MapArray = CheckArray;
  } else {
    MapArray = Keys;
  }

  return (
    <div className="flex flex-col gap-2">
      <div id="NameRequired" className="text-sm text-red-500 FadeError">
        Name Required
      </div>
      {MapArray.map((key, index) => {
        let input = <STDInput key={index} keyName={key} Step={Step} />;
        if (key.includes("Make") === true || key.includes("Model") === true)
          input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
        return input;
      })}
      <CreateNewViewButton Step={"Racks"} />
    </div>
  );
}
