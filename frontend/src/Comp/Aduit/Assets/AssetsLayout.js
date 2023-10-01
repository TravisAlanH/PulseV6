import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import AssetInputs from "./AssetInputs";
// import RackRack from "../Rack/RackRack";
import RackFull from "../Rack/RackFull";

export default function AssetsLayout({ AllData }) {
  let Step = "Assets";
  const Data = useSelector((state) => state.data[Step]);
  // const currentRacks = useSelector((state) => state.data.Current["Racks"]);
  const RackState = useSelector((state) => state.data["Racks"]);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={"Racks"} />
        <SetCurrentSelection Step={"Assets"} />
      </div>
      <div></div>
      <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
        {Data.length > 0 ? (
          <div className="">
            <AssetInputs AllData={AllData} Step={Step} />
          </div>
        ) : (
          <div className="w-[12rem]"></div>
        )}
        {/* {RackState.length > 0 ? <RackRack Step={Step} /> : null} */}
        {RackState.length > 0 ? <RackFull Step={Step} /> : null}
      </div>
    </div>
  );
}
