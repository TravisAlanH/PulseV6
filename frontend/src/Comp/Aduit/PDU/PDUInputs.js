import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";
import SearchLayout from "../../Search/SearchLayout";
import AddFieldButton from "../AddField/AddFieldButton";
import UseLastData from "../../Reuse/UseLastData";
import CreateNewViewButton from "../AddNew/CreateNewViewButton";

export default function PDUInputs({ AllData, DepthSide }) {
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
      <div id="NameRequired" className="text-sm text-red-500 FadeError">
        Name Required
      </div>
      {MapArray.map((key, index) => {
        let input = <STDInput key={index} keyName={key} Step={Step} />;
        if (key.includes("Make") === true || key.includes("Model") === true)
          input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
        return input;
      })}
      {/*  */}
      {StepData.length > 0 && StepData.length !== 1 && State["Make *"].value === "" && State["Model *"].value === "" ? (
        <UseLastData Step={Step} DepthSide={DepthSide} />
      ) : null}
      {/*  */}
      <div className="flex flex-row justify-between">
        {StepData.length > 0 &&
        (State["Make *"].value !== "" || State["Model *"].value !== "" || State["Name *"].value !== "") ? (
          <AddFieldButton Step={"PDUs"} />
        ) : null}
        <CreateNewViewButton Step={"PDUs"} />
      </div>
    </div>
  );
}
