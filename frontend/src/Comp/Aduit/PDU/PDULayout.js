import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import PDUInputs from "./PDUInputs";
import AddToStep from "../../Reuse/AddToStep";
import PDURack from "./PDURack";

export default function PDULayout({ AllData }) {
  let Step = "PDUs";
  const Data = useSelector((state) => state.data[Step]);
  const RackLength = useSelector((state) => state.data.Racks.length);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={"Racks"} />
        {RackLength > 0 ? <AddToStep Step={Step} /> : null}
      </div>
      <div></div>
      <div className="flex flex-row justify-between lg:justify-center gap-6 px-6">
        {Data.length > 0 ? (
          <div className="sticky top-16">
            <PDUInputs AllData={AllData} Step={Step} />
          </div>
        ) : (
          <div className="w-[10rem]"></div>
        )}
        <PDURack Step={Step} />
      </div>
    </div>
  );
}
