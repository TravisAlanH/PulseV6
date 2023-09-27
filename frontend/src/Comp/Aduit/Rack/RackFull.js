import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../../Store/Slices/Slice";
import "../../../Styles/PDU.css";
import PDUViewVertical from "../PDU/PDUViewVertical";
// import AddToRacks from "./AddToRacks";

export default function RackFull({ Step, setDepthSide }) {
  const current = useSelector((state) => state.data.Current["Racks"]);
  const Assets = useSelector((state) => state.data["Assets"]);
  const PDUs = useSelector((state) => state.data["PDUs"]);
  const RackState = useSelector((state) => state.data["Racks"][current]);
  // const currentAsset = useSelector((state) => state.data.Current["Assets"]);
  const dispatch = useDispatch();

  let Layout = [];

  // will need to remake this for PDU / Rack / Assets,
  // need to check inports for a raritain PDU 30 ru, to see if all import fields will pass import (Orientation)
  // need to check import for a Matrix C166 PUD, to see if Depth Position ** will pass import
  if (RackState === undefined) return null;
  for (let i = RackState.RUHeight.value; i > 0; i--) {
    let Show = true;
    Layout.push(
      <div key={i}>
        <div className="flex flex-row w-[18rem] justify-start items-center border-2">
          <div className="border-r-2 w-[2rem] flex flex-row justify-center">{i}</div>
          {Assets.map((object, index) => {
            if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
              Show = false;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2"
                  onClick={() => {
                    let payload = {
                      Step: "Assets",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs">Make</label>
                    <div className="">{object["Make *"].value.slice(0, 5)}</div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs">Model</label>
                    <div className="w-[10rem]">{object["Model *"].value.slice(0, 16)}</div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {PDUs.map((object, index) => {
            if (
              object["U Position *"].value === i &&
              object["Cabinet *"].value === RackState["Name *"].value &&
              object["Cabinet Side *"].value === "" &&
              object["Depth Position *"].value === ""
            ) {
              Show = false;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2"
                  onClick={() => {
                    let payload = {
                      Step: "PDUs",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs">Makeee</label>
                    <div className="">{object["Make *"].value.slice(0, 5)}</div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs">Model</label>
                    <div className="w-[10rem]">{object["Model *"].value.slice(0, 16)}</div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {(Step === "Assets" || Step === "PDUs") && Show ? (
            <div id="ADD" className="w-full flex flex-row justify-center">
              <button
                className="w-[9rem] orangeButtonVertical"
                onClick={() => {
                  setDepthSide({ Depth: "", Side: "" });
                  let payload = {
                    Step: "PDUs",
                    CabinetSide: "",
                    DepthPosition: "",
                    UPosition: i,
                    Cabinet: RackState["Name *"].value,
                  };
                  dispatch(Action.addToPDU(payload));
                }}>
                Add PDU
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Front"} setDepthSide={setDepthSide} Step={Step} />
      <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Center"} setDepthSide={setDepthSide} Step={Step} />
      <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Back"} setDepthSide={setDepthSide} Step={Step} />
      <div className="flex flex-col">{Layout}</div>
      <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Back"} setDepthSide={setDepthSide} Step={Step} />
      <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Center"} setDepthSide={setDepthSide} Step={Step} />
      <PDUViewVertical CabinetSide={"Right Side"} DepthPosition={"Front"} setDepthSide={setDepthSide} Step={Step} />
    </div>
  );
}
