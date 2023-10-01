import React from "react";
import { useSelector } from "react-redux";
import UPSInputs from "./UPSInput";

export default function UPSLocationData({ Step, AllData }) {
  const Data = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);

  let Input = <></>;

  if (Data.length > 0 && Data[current]["Location Type"].value === "Location") {
    Input = <UPSInputs AllData={AllData} Step={Step} />;
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="">{Input}</div>
    </div>
  );
}
