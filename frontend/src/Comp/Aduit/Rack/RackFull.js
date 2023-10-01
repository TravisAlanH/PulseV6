import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../../../Store/Slices/Slice";
import "../../../Styles/PDU.css";
import PDUViewVertical from "../PDU/PDUViewVertical";
import AddToRacks from "./AddToRacks";
// import AddToRacks from "./AddToRacks";

export default function RackFull({ Step, setDepthSide }) {
  const current = useSelector((state) => state.data.Current["Racks"]);
  const Assets = useSelector((state) => state.data["Assets"]);
  const PDUs = useSelector((state) => state.data["PDUs"]);
  const UPSs = useSelector((state) => state.data["UPSs"]);
  const ATSs = useSelector((state) => state.data["ATSs"]);
  const RackState = useSelector((state) => state.data["Racks"][current]);
  // const openRU = useSelector((state) => state.data["Racks"][current]["!!!OpenRUArray"]);
  // const currentAsset = useSelector((state) => state.data.Current["Assets"]);
  const dispatch = useDispatch();

  // console.log(openRU);
  let holdOpenRU = [];

  let Layout = [];

  // will need to remake this for PDU / Rack / Assets,
  // need to check inports for a raritain PDU 30 ru, to see if all import fields will pass import (Orientation)
  // need to check import for a Matrix C166 PUD, to see if Depth Position ** will pass import
  if (RackState === undefined) return null;
  for (let i = 1; i < RackState["RU Height"].value + 1; i++) {
    let Show = true;
    Layout.push(
      <div key={i}>
        <div className="flex flex-row w-[19rem] justify-start items-center  border-2">
          <div className="border-r-2 w-[1.75rem] flex flex-row justify-center h-full">{i}</div>
          {Assets.map((object, index) => {
            if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
              Show = false;
              for (let j = 0; j < object["RU Height"].value - 1; j++) {
                holdOpenRU.push(1);
              }
              i = object["RU Height"].value + i - 1;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2 py-1"
                  onClick={() => {
                    let payload = {
                      Step: "Assets",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div>
                    <div className="rounded-full bg-green-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1"></div>
                  </div>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Make</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Make *"].value.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Model</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Model *"].value.slice(0, 16)}
                    </div>
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
              for (let j = 0; j < object["RU Height"].value - 1; j++) {
                holdOpenRU.push(1);
              }
              i = object["RU Height"].value + i - 1;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2 py-1"
                  onClick={() => {
                    let payload = {
                      Step: "PDUs",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div>
                    <div className="rounded-full bg-blue-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1"></div>
                  </div>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Make</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Make *"].value.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Model</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Model *"].value.slice(0, 16)}
                    </div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {UPSs.map((object, index) => {
            if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
              Show = false;
              for (let j = 0; j < object["RU Height"].value - 1; j++) {
                holdOpenRU.push(1);
              }
              i = object["RU Height"].value + i - 1;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2 py-1"
                  onClick={() => {
                    let payload = {
                      Step: "UPSs",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div>
                    <div className="rounded-full bg-red-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1"></div>
                  </div>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Make</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Make *"].value.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Model</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Model *"].value.slice(0, 16)}
                    </div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {ATSs.map((object, index) => {
            if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
              Show = false;
              for (let j = 0; j < object["RU Height"].value - 1; j++) {
                holdOpenRU.push(1);
              }
              i = object["RU Height"].value + i - 1;

              return (
                <div
                  key={index}
                  className="flex flex-row pl-2 py-1"
                  onClick={() => {
                    let payload = {
                      Step: "ATSs",
                      value: index,
                    };
                    dispatch(Action.updateCurrent(payload));
                  }}>
                  <div>
                    <div className="rounded-full bg-purple-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1"></div>
                  </div>
                  <div className="flex flex-col w-[4rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Make</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Make *"].value.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col w-[7rem] justify-center">
                    <label className="text-xs h-[.75rem] flex flex-col justify-center">Model</label>
                    <div className="w-[10rem] h-[1rem] flex flex-col justify-center">
                      {object["Model *"].value.slice(0, 16)}
                    </div>
                  </div>
                </div>
              );
            } else return null;
          })}
          {Step === "PDUs" && Show ? (
            <div id="ADD" className="w-full flex flex-row justify-center">
              <button
                className="w-[9rem] orangeButton"
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
          {(Step === "Assets" || Step === "UPSs" || Step === "ATSs") && Show ? (
            <div id="ADD" className="w-full flex flex-row justify-center">
              <AddToRacks Step={Step} index={i} />
            </div>
          ) : null}
        </div>
      </div>
    );
    if (Show === true) holdOpenRU.push(0);
    if (Show === false) holdOpenRU.push(1);
  }
  let payload = {
    value: holdOpenRU,
    Current: current,
  };
  dispatch(Action.updateOpenRu(payload));

  // dispatch(Action.changeData(payload));

  return (
    <div>
      <div className="hidden lg:flex flex-row">
        {Step === "Assets" || Step === "UPSs" || Step === "ATSs" ? null : (
          <div className="flex flex-row">
            <PDUViewVertical
              CabinetSide={"Left Side"}
              DepthPosition={"Front"}
              setDepthSide={setDepthSide}
              Step={Step}
            />
            <PDUViewVertical
              CabinetSide={"Left Side"}
              DepthPosition={"Center"}
              setDepthSide={setDepthSide}
              Step={Step}
            />
            <PDUViewVertical CabinetSide={"Left Side"} DepthPosition={"Back"} setDepthSide={setDepthSide} Step={Step} />
          </div>
        )}
        <div className="flex flex-col-reverse">{Layout}</div>
        {Step === "Assets" || Step === "UPSs" || Step === "ATSs" ? null : (
          <div className="flex flex-row">
            <PDUViewVertical
              CabinetSide={"Right Side"}
              DepthPosition={"Back"}
              setDepthSide={setDepthSide}
              Step={Step}
            />
            <PDUViewVertical
              CabinetSide={"Right Side"}
              DepthPosition={"Center"}
              setDepthSide={setDepthSide}
              Step={Step}
            />
            <PDUViewVertical
              CabinetSide={"Right Side"}
              DepthPosition={"Front"}
              setDepthSide={setDepthSide}
              Step={Step}
            />
          </div>
        )}
      </div>
      <div className="lg:hidden flex flex-row">
        <div className="flex flex-col-reverse">{Layout}</div>
      </div>
    </div>
  );
}
