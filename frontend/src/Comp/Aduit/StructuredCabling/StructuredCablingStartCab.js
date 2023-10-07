import React from "react";
import { useSelector } from "react-redux";

import "../../../Styles/PDU.css";
import { BiArrowFromLeft } from "react-icons/bi";
import "./StructuredCabling.css";
// import AddToRacks from "./AddToRacks";
import Template from "../../../Store/Slices/Template";
import StructuredCablingDropInput from "./StructuredCablingDropInput";

export default function StructuredCablingStartCab({ setStartItem, RackIndex, startItem, setStartSCData }) {
  const Assets = useSelector((state) => state.data["Assets"]);
  const PDUs = useSelector((state) => state.data["PDUs"]);
  const UPSs = useSelector((state) => state.data["UPSs"]);
  const ATSs = useSelector((state) => state.data["ATSs"]);
  const RackState = useSelector((state) => state.data["Racks"][RackIndex]);

  // const dispatch = useDispatch();
  let StartingArray = [];
  let EndingArray = [];
  let startMap = [];

  // let newObject = Template.StructuredCabling;

  let keys = Object.keys(Template.StructuredCabling);
  keys.map((item) => {
    if (item.includes("Starting")) StartingArray.push(item);
    if (item.includes("Ending")) EndingArray.push(item);
    return null;
  });
  if (Object.keys(startItem).length > 0) {
    for (let i = 0; i < startItem["Ports"].value; i++) {
      startMap.push(i + 1);
    }
    // startPortSpacing = startItem["Ports"].value / 2;
  }

  const buttons = document.getElementsByClassName("StartDevices");
  const arrowsHidden = document.getElementsByClassName("ArrowHidden");
  const arrowsDisplay = document.getElementsByClassName("ArrowDisplay");

  function removeSelected() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("selectedStructuredCable");
          arrowsDisplay[j].classList.add("hidden");
          arrowsHidden[j].classList.remove("hidden");
        }
      });
    }
  }

  // function removeArrow() {
  //   for (var i = 0; i < arrows.length; i++) {
  //     arrows[i].addEventListener("click", function () {
  //       console.log("removeArrow");
  //       for (var j = 0; j < arrows.length; j++) {
  //         arrows[j].classList.remove("orangeButton");
  //         // arrows[j].classList.add("orangeButtonClear");
  //       }
  //     });
  //   }
  // }

  let holdOpenRU = [];

  let Layout = [];

  let AssetsCopy = Assets.map((obj, index) => ({ ...obj, Step: "Assets", Index: index }));
  let PDUsCopy = PDUs.map((obj, index) => ({ ...obj, Step: "PDUs", Index: index }));
  let UPSsCopy = UPSs.map((obj, index) => ({ ...obj, Step: "UPSs", Index: index }));
  let ATSsCopy = ATSs.map((obj, index) => ({ ...obj, Step: "ATSs", Index: index }));

  let Data = [...AssetsCopy, ...PDUsCopy, ...UPSsCopy, ...ATSsCopy];

  if (RackState === undefined) return null;
  for (let i = 1; i < RackState["RU Height"].value + 1; i++) {
    Data.map((object, index) => {
      if (object["U Position *"].value === i && object["Cabinet *"].value === RackState["Name *"].value) {
        let currentRU = i;
        for (let j = 0; j < object["RU Height"].value - 1; j++) {
          holdOpenRU.push(1);
        }
        i = object["RU Height"].value + i - 1;

        return Layout.push(
          <div key={i}>
            <div
              id={"StartItem" + i}
              className="StartDevices border-2 transition-all h-[2.5rem] overflow-hidden"
              onClick={() => {
                setStartItem(object);
                removeSelected();
                // removeArrow();
                document.getElementById("arrowButtonHidden" + index).classList.add("hidden");
                document.getElementById("arrowButtonDisplay" + index).classList.remove("hidden");
                document.getElementById("StartItem" + i).classList.add("selectedStructuredCable");
              }}>
              <div className="h-[2.5rem]  flex flex-row w-[19rem] justify-between items-center border-2">
                <div className="border-r-2 w-[1.75rem] flex flex-row justify-center items-center h-full">
                  {currentRU}
                </div>
                <div key={index} className="flex flex-row pl-2 py-1 justify-between" onClick={() => {}}>
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
                      {object["Model *"].value.length > 9
                        ? object["Model *"].value.slice(0, 9) + "..."
                        : object["Model *"].value}
                    </div>
                  </div>
                </div>
                <button
                  id={`arrowButtonHidden${index}`}
                  className="orangeButtonClear outline-2 flex flex-row justify-center items-center text-[1.7rem] mr-2 ArrowHidden">
                  <BiArrowFromLeft />
                </button>
                <button
                  id={`arrowButtonDisplay${index}`}
                  className="orangeButton flex flex-row justify-center items-center text-[1.7rem] mr-2 ArrowDisplay hidden">
                  <BiArrowFromLeft />
                </button>
              </div>
              <div className="flex flex-col items-center">
                {
                  <StructuredCablingDropInput
                    RackIndex={RackIndex}
                    startItem={object}
                    setStartSCData={setStartSCData}
                  />
                }
                {/* need to send Step and object Index */}
              </div>
            </div>
          </div>
        );
      } else return null;
    });
  }

  // dispatch(Action.changeData(payload));

  return (
    <div className="flex flex-row">
      <div className="flex flex-col-reverse">{Layout}</div>
    </div>
  );
}
