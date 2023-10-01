import React from "react";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
// import AddToStep from "../../Reuse/AddToStep";
// import PDURack from "./PDURack";
import UPSAddSelect from "./UPSAddSelect";
import UPSLocationData from "./UPSLocationData";
import UPSRacksData from "./UPSRacksData";

export default function UPSLayout({ AllData }) {
  let Step = "UPSs";
  const [mountType, setMountType] = React.useState("Location");

  ///////
  ///////

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={"Location"} />
        <SetCurrentSelection Step={"Racks"} />
        <SetCurrentSelection Step={"UPSs"} />
      </div>
      <div className="flex flex-col justify-center lg:justify-center gap-6 px-6">
        <div className="flex flex-row justify-center">
          <UPSAddSelect Step={Step} keyName={"Location Type"} setMountType={setMountType} />
        </div>
        {mountType === "Location" ? (
          <UPSLocationData Step={Step} AllData={AllData} />
        ) : (
          <UPSRacksData Step={Step} AllData={AllData} />
        )}

        {/* {Data.length > 0 && Data[current]["Location Type"].value === "Cabinet" ? (
          <UPSInputs AllData={AllData} Step={Step} DepthSide={DepthSide} />
        ) : null}

        {RackState.length > 0 && mountType === "Cabinet" ? <RackFull Step={Step} setDepthSide={setDepthSide} /> : null} */}
      </div>
    </div>
  );
}
