import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AddToStep from "../../Reuse/AddToStep";
import AssetInputs from "./AssetInputs";
import RackRack from "../Rack/RackRack";

export default function AssetsLayout({ AllData }) {
  let Step = "Assets";
  const Data = useSelector((state) => state.data[Step]);
  const RackState = useSelector((state) => state.data["Racks"]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        Current Rack
        <SetCurrentSelection Step={"Racks"} />
      </div>
      <div></div>
      <div className="flex flex-row">
        {Data.length > 0 ? <AssetInputs AllData={AllData} Step={Step} /> : <div className="w-[10rem]"></div>}
        {RackState.length > 0 ? <RackRack Step={Step} /> : null}
      </div>
    </div>
  );
}
