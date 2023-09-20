import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AddToStep from "../../Reuse/AddToStep";
import RackInput from "./RackInput";
import RackRack from "./RackRack";

export default function RackLayout({ AllData }) {
  let Step = "Racks";
  const Data = useSelector((state) => state.data[Step]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <SetCurrentSelection Step={Step} />
        <AddToStep Step={Step} />
      </div>
      {Data.length > 0 ? (
        <div className="flex flex-row">
          <RackInput AllData={AllData} Step={Step} />
          <RackRack Step={Step} />
        </div>
      ) : null}
    </div>
  );
}
