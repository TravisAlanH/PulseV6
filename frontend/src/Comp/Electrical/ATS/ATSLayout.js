import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import ATSInputs from "./ATSInput";
import RackFull from "../../Aduit/Rack/RackFull";

export default function ATSLayout({ AllData }) {
  let Step = "ATSs";
  const Data = useSelector((state) => state.data[Step]);
  const RackState = useSelector((state) => state.data["Racks"]);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={"Racks"} />
        <SetCurrentSelection Step={Step} />
      </div>
      <div></div>
      <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
        <div className="">{Data.length > 0 ? <ATSInputs AllData={AllData} Step={Step} /> : null}</div>
        {RackState.length > 0 ? <RackFull Step={Step} /> : null}
      </div>
    </div>
  );
}
