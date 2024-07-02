import React from "react";
import PDUViewVertical from "./PDUViewVertical";
import { useSelector } from "react-redux";

export default function PDUViewVerticalComp({ Step, setDepthSide }) {
  const currentRack = useSelector((state) => state.data.Current["Racks"]);
  const RackState = useSelector((state) => state.data["Racks"][currentRack]);

  return (
    <div className="lg:hidden flex flex-row pt-3 w-full justify-center">
      {Step === "Assets" ? null : (
        <div className="flex flex-row">
          <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Front"} setDepthSide={setDepthSide} Step={Step} />
          <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Center"} setDepthSide={setDepthSide} Step={Step} />
          <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Back"} setDepthSide={setDepthSide} Step={Step} />
        </div>
      )}
      <div className="text-vertical h-[24.5rem] w-[4rem] flex flex-col justify-center items-center">Cabinet: {RackState["Name *"].value}</div>
      {Step === "Assets" ? null : (
        <div className="flex flex-row">
          <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Back"} setDepthSide={setDepthSide} Step={Step} />
          <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Center"} setDepthSide={setDepthSide} Step={Step} />
          <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Front"} setDepthSide={setDepthSide} Step={Step} />
        </div>
      )}
    </div>
  );
}
