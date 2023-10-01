import React from "react";
import { useSelector } from "react-redux";
import RackFull from "../../Aduit/Rack/RackFull";
import UPSInputs from "./UPSInput";

export default function UPSRacksData({ Step, AllData }) {
  const RackState = useSelector((state) => state.data["Racks"]);
  const Data = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);

  let Input = <></>;

  if (Data.length > 0 && Data[current]["Location Type"].value === "Cabinet") {
    Input = <UPSInputs AllData={AllData} Step={Step} />;
  }

  return (
    <div className="flex flex-row justify-center gap-6">
      <div className="">{Input}</div>
      {RackState.length > 0 ? <RackFull Step={Step} /> : null}
    </div>
  );
}
