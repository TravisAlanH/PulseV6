import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";
import SearchLayout from "../../Search/SearchLayout";
import AddFieldButton from "../AddField/AddFieldButton";

export default function PDUInputs({ AllData }) {
  const Step = "PDUs";

  const Current = useSelector((state) => state.data.Current[Step]);
  const State = useSelector((state) => state.data[Step][Current]);
  const StepData = useSelector((state) => state.data[Step]);
  const Keys = Object.keys(State);

  const CheckArray = ["Name *", "Make *", "Model *"];
  let MapArray = [];

  if (State["Make *"].value === "" || State["Model *"].value === "" || State["Name *"].value === "") {
    MapArray = CheckArray;
  } else {
    MapArray = Keys;
  }

  return (
    <div className="flex flex-col gap-2 sticky top-[7rem]">
      {MapArray.map((key, index) => {
        let input = <STDInput key={index} keyName={key} Step={Step} />;
        if (key.includes("Make") === true || key.includes("Model") === true)
          input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
        return input;
      })}
      {StepData.length > 0 &&
      (State["Make *"].value !== "" || State["Model *"].value !== "" || State["Name *"].value !== "") ? (
        <AddFieldButton Step={"PDUs"} />
      ) : null}
    </div>
  );
}
