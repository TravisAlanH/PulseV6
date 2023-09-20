import React from "react";
import STDInput from "../../Reuse/STDInput";
import { useSelector } from "react-redux";
import SearchLayout from "../../Search/SearchLayout";

export default function AssetInputs({ AllData }) {
  const Step = "Assets";

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

  // {
  //   State["Make *"].value === "" || State["Model *"].value === "" || State["Name *"].value === ""
  //     ? (Check = (
  //         <div className="flex flex-col">
  //           {CheckArray.map((key, index) => {
  //             let input = <STDInput key={index} keyName={key} Step={Step} />;
  //             if (key.includes("Make") === true || key.includes("Model") === true)
  //               input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
  //             return input;
  //           })}
  //         </div>
  //       ))
  //     : (Check = (
  //         <div className="flex flex-col">
  //           {Keys.map((key, index) => {
  //             let input = <STDInput key={index} keyName={key} Step={Step} />;
  //             if (key.includes("Make") === true || key.includes("Model") === true)
  //               input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
  //             return input;
  //           })}
  //         </div>
  //       ));
  // }

  return (
    <div className="flex flex-col">
      {MapArray.map((key, index) => {
        let input = <STDInput key={index} keyName={key} Step={Step} />;
        if (key.includes("Make") === true || key.includes("Model") === true)
          input = <SearchLayout key={index} KeyName={key} Step={Step} AllData={AllData} />;
        return input;
      })}
    </div>
  );
}
