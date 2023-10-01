import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
// import AddToStep from "../../Reuse/AddToStep";
// import PDURack from "./PDURack";
import RackFull from "../../Aduit/Rack/RackFull";
import UPSInputs from "./UPSInput";
import UPSAddSelect from "./UPSAddSelect";

export default function UPSLayout({ AllData }) {
  let Step = "UPSs";
  const Data = useSelector((state) => state.data[Step]);
  const current = useSelector((state) => state.data.Current[Step]);
  // const RackLength = useSelector((state) => state.data.Racks.length);
  const [DepthSide, setDepthSide] = React.useState({ Depth: "", Side: "" });
  // const currentRacks = useSelector((state) => state.data.Current["Racks"]);
  // const RackState = useSelector((state) => state.data["Racks"][currentRacks]);
  const RackState = useSelector((state) => state.data["Racks"]);
  const [mountType, setMountType] = React.useState("");

  ///////
  //! I NEED TO SPLIT THE LOCATION AND CABINET ADDS INTO TWO COMPONENTS
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
        {/* {RackLength > 0 ? <AddToStep Step={Step} /> : null} */}
      </div>
      <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
        {/* {Data.length > 0 ? ( */}
        <div className="">
          <div>
            {/* {RackState.length > 0 ? ( */}
            <div>
              {/* <AddToStep Step={Step} /> */}
              <UPSAddSelect Step={Step} keyName={"Location Type"} setMountType={setMountType} />
            </div>
            {/* ) : null} */}
          </div>
          {Data.length > 0 && Data[current]["Location Type"].value === "Cabinet" ? (
            <UPSInputs AllData={AllData} Step={Step} DepthSide={DepthSide} />
          ) : null}
          {/* {RackState.length > 0 ? <PDUViewVerticalComp Step={Step} setDepthSide={setDepthSide} /> : null} */}
        </div>

        {/* {RackState["RU Height"].value > 1 ? <RackFull Step={Step} setDepthSide={setDepthSide} /> : null} */}
        {/* {RackState.length > 0 ? <RackFull Step={Step} setDepthSide={setDepthSide} /> : null} */}
        {RackState.length > 0 && mountType === "Cabinet" ? <RackFull Step={Step} setDepthSide={setDepthSide} /> : null}

        {/* <PDURack Step={Step} setDepthSide={setDepthSide} /> */}
      </div>
    </div>
  );
}
