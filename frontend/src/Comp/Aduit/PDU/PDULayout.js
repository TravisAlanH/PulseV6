import React from "react";
import { useSelector } from "react-redux";
import SetCurrentSelection from "../../Reuse/SetCurrentSelection";
import PDUInputs from "./PDUInputs";
// import AddToStep from "../../Reuse/AddToStep";
// import PDURack from "./PDURack";
import RackFull from "../Rack/RackFull";
import PDUViewVerticalComp from "./PDUViewVerticalComp";

export default function PDULayout({ AllData }) {
  let Step = "PDUs";
  const Data = useSelector((state) => state.data[Step]);
  // const RackLength = useSelector((state) => state.data.Racks.length);
  const [DepthSide, setDepthSide] = React.useState({ Depth: "", Side: "" });
  const currentRacks = useSelector((state) => state.data.Current["Racks"]);
  const RackState = useSelector((state) => state.data["Racks"][currentRacks]["RU Height"].value);

  return (
    <div className="flex flex-col border-2 m-2">
      <div className="bg-[#F7F5F1] flex flex-row justify-start h-[3rem] items-center pl-6 text-lg font-bold">
        {Step === "Racks" ? "Cabinet" : Step}
      </div>
      <div className="flex flex-row gap-3 w-full justify-center p-2 border-b-2 mb-2">
        <SetCurrentSelection Step={"Racks"} />
        <SetCurrentSelection Step={"PDUs"} />

        {/* {RackLength > 0 ? <AddToStep Step={Step} /> : null} */}
      </div>
      <div></div>
      <div className="flex flex-row justify-center lg:justify-center gap-6 px-6">
        {/* {Data.length > 0 ? ( */}
        <div className="">
          {Data.length > 0 ? <PDUInputs AllData={AllData} Step={Step} DepthSide={DepthSide} /> : null}
          <PDUViewVerticalComp Step={Step} setDepthSide={setDepthSide} />
        </div>

        {RackState > 1 ? <RackFull Step={Step} setDepthSide={setDepthSide} /> : null}

        {/* <PDURack Step={Step} setDepthSide={setDepthSide} /> */}
      </div>
    </div>
  );
}
