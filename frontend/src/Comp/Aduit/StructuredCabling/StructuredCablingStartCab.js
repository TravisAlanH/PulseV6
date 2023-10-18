import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../../Styles/PDU.css";
import { BiArrowFromLeft } from "react-icons/bi";
import "./StructuredCabling.css";
// import AddToRacks from "./AddToRacks";
import StructuredCablingDropInput from "./StructuredCablingDropInput";
import * as Actions from "../../../Store/Slices/Slice";

export default function StructuredCablingStartCab({ RackIndex }) {
  const Assets = useSelector((state) => state.data["Assets"]);
  const PDUs = useSelector((state) => state.data["PDUs"]);
  const UPSs = useSelector((state) => state.data["UPSs"]);
  const ATSs = useSelector((state) => state.data["ATSs"]);
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);
  const build = useSelector((state) => state.data.Current.StructuredCablingSet);
  const dispatch = useDispatch();
  let payload = {};

  const buttons = document.getElementsByClassName("StartDevices");

  function removeSelected() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selectedStructuredCable");
        }
      });
    }
  }

  let Layout = [];

  let AssetsCopy = Assets.map((obj, index) => ({ ...obj, Step: "Assets", Index: index }));
  let PDUsCopy = PDUs.map((obj, index) => ({ ...obj, Step: "PDUs", Index: index }));
  let UPSsCopy = UPSs.map((obj, index) => ({ ...obj, Step: "UPSs", Index: index }));
  let ATSsCopy = ATSs.map((obj, index) => ({ ...obj, Step: "ATSs", Index: index }));

  let Data = [...AssetsCopy, ...PDUsCopy, ...UPSsCopy, ...ATSsCopy];

  if (RackState === undefined) return null;
  for (let i = 1; i < RackState["RU Height"].value + 1; i++) {
    Data.map((object, index) => {
      // if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
      if (object["U Position *"].value === i && object["Cabinet *"].value === build.rack) {
        let currentRU = i;
        i = object["RU Height"].value + i - 1;
        return Layout.push(
          <div key={i}>
            <div
              id={"StartItem" + i}
              className={
                "StartDevices border-2 transition-all h-[2.5rem] overflow-hidden " + object["Name *"].value ===
                build.Asset
                  ? "selectedStructuredCable"
                  : null
              }
              onClick={() => {
                payload.Key = "asset";
                payload.value = object["Name *"].value;
                dispatch(Actions.BuildStructuredCableSet(payload));
                removeSelected();
                document.getElementById("StartItem" + i).classList.add("selectedStructuredCable");
              }}>
              <div className="h-[2.5rem]  flex flex-row w-[19rem] justify-between items-center border-2">
                <div className="border-r-2 w-[1.75rem] flex flex-row justify-center items-center h-full">
                  {currentRU}
                </div>
                <div key={index} className="flex flex-row pl-2 py-1 justify-between" onClick={() => {}}>
                  <div>
                    <div
                      className={`rounded-full bg-${
                        object.Step === "Assets"
                          ? "green"
                          : object.Step === "PDUs"
                          ? "blue"
                          : object.Step === "UPSs"
                          ? "red"
                          : object.Step === "ATSs"
                          ? "yellow"
                          : "gray"
                      }-500 w-[.5rem] h-[.5rem] mt-[.1rem] mr-1`}></div>
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
                      {object["Model *"].value.length > 9
                        ? object["Model *"].value.slice(0, 9) + "..."
                        : object["Model *"].value}
                    </div>
                  </div>
                </div>
                <button
                  id={`arrowButtonDisplay${index}`}
                  className="orangeButton flex-row justify-center items-center text-[1.7rem] mr-2 ArrowDisplay ">
                  <BiArrowFromLeft />
                </button>
              </div>
              <div className="flex flex-col items-center">
                {<StructuredCablingDropInput RackIndex={RackIndex} Asset={object} />}
              </div>
            </div>
          </div>
        );
      } else return null;
    });
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col-reverse">{Layout}</div>
    </div>
  );
}
