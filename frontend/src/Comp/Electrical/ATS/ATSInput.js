import React from "react";
import { useSelector } from "react-redux";
import STDInput from "../../Reuse/STDInput";
import SearchLayout from "../../Search/SearchLayout";
import UseLastData from "../../Reuse/UseLastData";
import DeleteButton from "../../Reuse/DeleteButton";
// import CreateNewViewButton from "../../Aduit/AddNew/CreateNewViewButton";

export default function ATSInputs({ AllData }) {
  const Step = "ATSs";

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
      {/*  */}
      {StepData.length > 0 && StepData.length !== 1 && State["Make *"].value === "" && State["Model *"].value === "" ? (
        <UseLastData Step={Step} />
      ) : null}
      {/*  */}
      <div className="flex flex-col justify-between gap-2">
        {StepData.length > 0 &&
        (State["Make *"].value !== "" || State["Model *"].value !== "" || State["Name *"].value !== "") ? (
          <div className="flex flex-row justify-between">
            <DeleteButton Step={Step} />
          </div>
        ) : null}
        {/* <CreateNewViewButton Step={Step} /> */}
      </div>
    </div>
  );
}
