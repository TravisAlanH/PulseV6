import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AddToStep from "../../Reuse/AddToStep";
import RackInput from "./RackInput";
// import RackRack from "./RackRack";
import RackFull from "./RackFull";
import PDUViewVerticalComp from "../PDU/PDUViewVerticalComp";

export default function RackLayout({ AllData }) {
  let Step = "Racks";
  const Data = useSelector((state) => state.data[Step]);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={Step} />
        <AddToStep Step={Step} />
      </div>
      {Data.length > 0 ? (
        <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
          <div>
            <RackInput AllData={AllData} Step={Step} />
            <PDUViewVerticalComp Step={Step} />
          </div>
          {/* <RackRack Step={Step} /> */}
          <RackFull Step={Step} />
        </div>
      ) : null}
    </div>
  );
}
